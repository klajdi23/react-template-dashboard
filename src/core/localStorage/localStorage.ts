
export class LocalStore {
 
    set(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
    
    get(key: string): string | null {
        return localStorage.getItem(key);
    }
    
    remove(key: string): void {
        localStorage.removeItem(key);
    }
}

export default LocalStore;

const localStore = new LocalStore();
export { localStore };