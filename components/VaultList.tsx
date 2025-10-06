'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Loader2 } from 'lucide-react';
import VaultItem from './VaultItem';
import { VaultItemData, encryptData, decryptData } from '@/lib/encryption';

interface VaultListProps {
  encryptionKey: string;
}

interface EncryptedVaultItem {
  _id: string;
  encryptedData: string;
  iv: string;
}

export default function VaultList({ encryptionKey }: VaultListProps) {
  const [items, setItems] = useState<{ id: string; data: VaultItemData }[]>([]);
  const [filteredItems, setFilteredItems] = useState<{ id: string; data: VaultItemData }[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newItem, setNewItem] = useState<VaultItemData>({
    title: '',
    username: '',
    password: '',
    url: '',
    notes: '',
  });

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems(items);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredItems(
        items.filter(
          (item) =>
            item.data.title.toLowerCase().includes(query) ||
            item.data.username.toLowerCase().includes(query) ||
            item.data.url.toLowerCase().includes(query) ||
            item.data.notes.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, items]);

  const loadItems = async () => {
    try {
      const res = await fetch('/api/vault');
      const data = await res.json();

      if (res.ok) {
        const decryptedItems = data.items.map((item: EncryptedVaultItem) => {
          try {
            const decrypted = decryptData(item.encryptedData, item.iv, encryptionKey);
            return { id: item._id, data: decrypted };
          } catch (error) {
            console.error('Failed to decrypt item:', error);
            return null;
          }
        }).filter(Boolean);

        setItems(decryptedItems);
      }
    } catch (error) {
      console.error('Failed to load items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const { encryptedData, iv } = encryptData(newItem, encryptionKey);

      const res = await fetch('/api/vault', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encryptedData, iv }),
      });

      if (res.ok) {
        await loadItems();
        setNewItem({ title: '', username: '', password: '', url: '', notes: '' });
        setIsAdding(false);
      }
    } catch (error) {
      console.error('Failed to add item:', error);
    }
  };

  const handleEdit = async (id: string, data: VaultItemData) => {
    try {
      const { encryptedData, iv } = encryptData(data, encryptionKey);

      const res = await fetch(`/api/vault/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ encryptedData, iv }),
      });

      if (res.ok) {
        await loadItems();
      }
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const res = await fetch(`/api/vault/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        await loadItems();
      }
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vault..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Item
        </button>
      </div>

      {isAdding && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4 border-2 border-indigo-500">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">New Vault Item</h3>
          <input
            type="text"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            placeholder="Title *"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            value={newItem.username}
            onChange={(e) => setNewItem({ ...newItem, username: e.target.value })}
            placeholder="Username"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            value={newItem.password}
            onChange={(e) => setNewItem({ ...newItem, password: e.target.value })}
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <input
            type="text"
            value={newItem.url}
            onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
            placeholder="URL"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <textarea
            value={newItem.notes}
            onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
            placeholder="Notes"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={!newItem.title}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewItem({ title: '', username: '', password: '', url: '', notes: '' });
              }}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">
            {searchQuery ? 'No items found matching your search.' : 'No vault items yet. Add your first one!'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredItems.map((item) => (
            <VaultItem
              key={item.id}
              id={item.id}
              data={item.data}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
