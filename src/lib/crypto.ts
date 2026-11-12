import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 12; // Recomendado pelo NIST para AES-GCM

function getEncryptionKey(): Buffer {
  const hexKey = process.env.LGPD_ENCRYPTION_KEY_HEX;
  if (!hexKey || hexKey.length !== 64) {
    throw new Error(
      "ERRO CRÍTICO DE SEGURANÇA: Variável LGPD_ENCRYPTION_KEY_HEX ausente ou inválida (deve possuir 64 caracteres hexadecimais / 32 bytes)."
    );
  }
  return Buffer.from(hexKey, "hex");
}

/**
 * Criptografa dados pessoais sensíveis (ex: Aconselhamento Pastoral) com AES-256-GCM
 * antes de persistir no PostgreSQL, atendendo à segurança por design da LGPD.
 */
export function encryptSensitiveData(plainText: string): string {
  const key = getEncryptionKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

  const encrypted = Buffer.concat([
    cipher.update(plainText, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return `${iv.toString("hex")}:${authTag.toString("hex")}:${encrypted.toString("hex")}`;
}

/**
 * Descriptografa dados sensíveis apenas quando solicitado por perfil autorizado (PASTOR ou PASTORAL).
 */
export function decryptSensitiveData(cipherPayload: string): string {
  const parts = cipherPayload.split(":");
  if (parts.length !== 3) {
    throw new Error("Formato de payload criptografado inválido ou corrompido.");
  }

  const [ivHex, authTagHex, encryptedHex] = parts;
  const key = getEncryptionKey();
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const encryptedText = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encryptedText),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}

/**
 * Gera hash seguro de senha utilizando Scrypt nativo com salt criptográfico de 16 bytes.
 */
export async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString("hex")}`);
    });
  });
}

/**
 * Verifica senha contra o hash armazenado usando comparação em tempo constante (timing-safe).
 */
export async function verifyPassword(
  password: string,
  storedHash: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, keyHex] = storedHash.split(":");
    if (!salt || !keyHex) return resolve(false);

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      const keyBuffer = Buffer.from(keyHex, "hex");
      if (keyBuffer.length !== derivedKey.length) return resolve(false);
      resolve(crypto.timingSafeEqual(keyBuffer, derivedKey));
    });
  });
}