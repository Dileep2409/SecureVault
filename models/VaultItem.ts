import mongoose, { Schema, model, models } from 'mongoose';

export interface IVaultItem {
  _id: string;
  userId: string;
  encryptedData: string; // JSON string containing encrypted: title, username, password, url, notes
  iv: string; // Initialization vector for encryption
  createdAt: Date;
  updatedAt: Date;
}

const VaultItemSchema = new Schema<IVaultItem>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    encryptedData: {
      type: String,
      required: true,
    },
    iv: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const VaultItem = models.VaultItem || model<IVaultItem>('VaultItem', VaultItemSchema);

export default VaultItem;
