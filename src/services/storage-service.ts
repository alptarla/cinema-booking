const StorageService = {
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get<T>(key: string): T | undefined {
    const value = localStorage.getItem(key);
    if (!value) return;
    return JSON.parse(value);
  },
  remove(key: string): void {
    localStorage.removeItem(key);
  },
};

export default StorageService;
