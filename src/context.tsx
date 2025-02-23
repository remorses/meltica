const globalContexts = new Map();

export function createContext<T>(defaultValue: T) {
    const contextKey = Symbol();

    globalContexts.set(contextKey, defaultValue);

    const Provider = ({ value, children }: { value: T; children: any }) => {
        globalContexts.set(contextKey, value);
        return children;
    };

    return { Provider, contextKey, defaultValue };
}

export function useContext<T>(context: { contextKey: symbol }): T {
    const { contextKey } = context;
    if (!globalContexts.has(contextKey)) {
        throw new Error("Context not found. Make sure you are using the correct context key.");
    }
    return globalContexts.get(contextKey) as T;
}
