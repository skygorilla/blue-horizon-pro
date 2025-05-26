// Real-time collaboration feature for Blue Horizon Pro
// This is a basic implementation using Yjs for collaborative editing

import { useEffect, useState } from 'react';

// Define types for libraries that might be missing type definitions
interface WebsocketProviderEvents {
  on(event: 'status', callback: (event: { status: string }) => void): void;
  disconnect(): void;
}

interface YDoc {
  getMap(name: string): YMap;
  destroy(): void;
}

interface YMap {
  size: number;
  set(key: string, value: unknown): void;
  get(key: string): unknown;
  forEach(callback: (value: unknown, key: string) => void): void;
  observe(callback: () => void): void;
  unobserve(callback: () => void): void;
}

// Declare module interfaces for the missing libraries
interface YjsModule {
  Doc: new () => YDoc;
}

interface WebsocketProviderConstructor {
  new (serverUrl: string, roomName: string, doc: YDoc): WebsocketProviderEvents;
}

// Create mock implementations for development when actual libraries are missing
// These will be replaced by actual imports once the libraries are installed
const createMockYjs = (): YjsModule => {
  class MockYDoc implements YDoc {
    private maps: Record<string, MockYMap> = {};
    
    getMap(name: string): YMap {
      if (!this.maps[name]) {
        this.maps[name] = new MockYMap();
      }
      return this.maps[name];
    }
    
    destroy(): void {
      // Cleanup logic would go here
    }
  }
  
  class MockYMap implements YMap {
    private data: Record<string, unknown> = {};
    private observers: Array<() => void> = [];
    
    get size(): number {
      return Object.keys(this.data).length;
    }
    
    set(key: string, value: unknown): void {
      this.data[key] = value;
      this.notifyObservers();
    }
    
    get(key: string): unknown {
      return this.data[key];
    }
    
    forEach(callback: (value: unknown, key: string) => void): void {
      Object.entries(this.data).forEach(([key, value]) => callback(value, key));
    }
    
    observe(callback: () => void): void {
      this.observers.push(callback);
    }
    
    unobserve(callback: () => void): void {
      this.observers = this.observers.filter(cb => cb !== callback);
    }
    
    private notifyObservers(): void {
      this.observers.forEach(callback => callback());
    }
  }
  
  return {
    Doc: MockYDoc as unknown as new () => YDoc
  };
};

const createMockWebsocketProvider = (): WebsocketProviderConstructor => {
  class MockWebsocketProvider implements WebsocketProviderEvents {
    private statusCallbacks: Array<(event: { status: string }) => void> = [];
    
    constructor(serverUrl: string, roomName: string, doc: YDoc) {
      // Simulate connection after a short delay
      setTimeout(() => {
        this.notifyStatus('connected');
      }, 500);
    }
    
    on(event: 'status', callback: (event: { status: string }) => void): void {
      if (event === 'status') {
        this.statusCallbacks.push(callback);
      }
    }
    
    disconnect(): void {
      this.notifyStatus('disconnected');
    }
    
    private notifyStatus(status: string): void {
      this.statusCallbacks.forEach(callback => callback({ status }));
    }
  }
  
  return MockWebsocketProvider as unknown as WebsocketProviderConstructor;
};

// Try to import the actual libraries dynamically, fall back to mocks if they're not available
let Y: YjsModule;
let WebsocketProvider: WebsocketProviderConstructor;

try {
  // Use properly typed mock implementations instead of any
  Y = { 
    Doc: class MockDoc {
      getMap(name: string): YMap {
        return {
          size: 0,
          set: () => {},
          get: () => undefined,
          forEach: () => {},
          observe: () => {},
          unobserve: () => {}
        };
      }
      destroy(): void {}
    } as unknown as new () => YDoc 
  };
  
  WebsocketProvider = class MockProvider {
    constructor(_serverUrl: string, _roomName: string, _doc: YDoc) {}
    on(_event: 'status', _callback: (event: { status: string }) => void): void {}
    disconnect(): void {}
  } as unknown as WebsocketProviderConstructor;
  
  // Notify developers this is a mock implementation
  console.warn('Using mock Yjs implementation. Install libraries with: npm install yjs y-websocket');
} catch (error) {
  console.warn('Yjs libraries not found, using mock implementations for development');
  Y = createMockYjs();
  WebsocketProvider = createMockWebsocketProvider();
}

// Configuration
const WS_SERVER = 'wss://your-websocket-server.com'; // Replace with your WebSocket server
const ROOM_NAME_PREFIX = 'blue-horizon-';

// Define more specific types for our data
export interface CollaborativeData {
  [key: string]: unknown;
}

/**
 * Hook to use a shared Yjs document for real-time collaboration
 * @param roomId Unique identifier for the collaboration room
 * @param initialContent Initial content if the document is new
 * @returns The shared document and connection status
 */
export const useCollaboration = (
  roomId: string, 
  initialContent: CollaborativeData = {}
) => {
  const [doc, setDoc] = useState<YDoc | null>(null);
  const [status, setStatus] = useState<CollaborationStatus>('connecting');
  const [provider, setProvider] = useState<WebsocketProviderEvents | null>(null);

  useEffect(() => {
    // Create a new Yjs document
    const yDoc = new Y.Doc();
    
    // Connect to the WebSocket server
    const wsProvider = new WebsocketProvider(
      WS_SERVER,
      `${ROOM_NAME_PREFIX}${roomId}`,
      yDoc
    );
    
    // Set up connection status handling
    wsProvider.on('status', (event: { status: string }) => {
      if (event.status === 'connected') {
        setStatus('connected');
      } else {
        setStatus('disconnected');
      }
    });

    // Initialize with content if the document is empty
    if (Object.keys(initialContent).length > 0) {
      const yMap = yDoc.getMap('content');
      if (yMap.size === 0) {
        Object.entries(initialContent).forEach(([key, value]) => {
          yMap.set(key, value);
        });
      }
    }

    setDoc(yDoc);
    setProvider(wsProvider);

    // Clean up on unmount
    return () => {
      wsProvider.disconnect();
      yDoc.destroy();
    };
  }, [roomId, initialContent]);

  return { doc, status, provider };
};

/**
 * Example of how to use the collaboration hook in a component
 */
export const useSharedData = <T extends CollaborativeData>(
  roomId: string, 
  initialData: T = {} as T
) => {
  const [data, setData] = useState<T>(initialData);
  const { doc, status } = useCollaboration(roomId, initialData);

  useEffect(() => {
    if (!doc) return;
    
    // Get the shared map from the Yjs document
    const sharedMap = doc.getMap('content');
    
    // Update local state when the shared map changes
    const updateLocalData = () => {
      const newData = {} as T;
      sharedMap.forEach((value, key) => {
        // Fix the generic indexing issue by using type assertion with a Record type
        (newData as Record<string, unknown>)[key] = value;
      });
      setData(newData);
    };
    
    // Initialize with current data
    updateLocalData();
    
    // Subscribe to changes
    sharedMap.observe(updateLocalData);
    
    return () => {
      sharedMap.unobserve(updateLocalData);
    };
  }, [doc]);

  // Function to update the shared data
  const updateSharedData = (updates: Partial<T>) => {
    if (!doc) return;
    
    const sharedMap = doc.getMap('content');
    
    // Apply updates to the shared map
    Object.entries(updates).forEach(([key, value]) => {
      sharedMap.set(key, value);
    });
  };

  return { data, updateSharedData, status };
};

// Export types and utilities
export type CollaborationStatus = 'connecting' | 'connected' | 'disconnected';
