import { Socket } from '@/lib/socket';
import { listenKeys, Store, StoreValue, atom } from 'nanostores';
import {
    useCallback,
    useRef,
    useSyncExternalStore,
    DependencyList,
    MutableRefObject,
} from 'react';
import { v4 as uuidv4 } from 'uuid'; // Importar UUID

export interface Message {
    id: string;
    username: string;
    avatar?: string;
    content: string;
    createdAt: string;
}

export const $messages = atom<Message[]>([]);

export function createMessage({message,socket,username}:{message: string, username: string, socket: Socket})  {
    const body = {
        content: message,
        createdAt: new Date().toISOString(), // Usar ISO para la fecha
        id: uuidv4(), // Usar uuid para ID único
        username,
    };
    socket.emit('sendMessage', body);
    $messages.set([...$messages.get(), body]);
    console.log(body);
}

let emit =
    (snapshotRef: MutableRefObject<any>, onChange: Function) =>
    (value: any) => {
        snapshotRef.current = value;
        onChange();
    }

type StoreKeys<T> = T extends { setKey: (k: infer K, v: any) => unknown }
    ? K
    : never;

export interface UseStoreOptions<SomeStore> {
    deps?: DependencyList;
    keys?: StoreKeys<SomeStore>[];
}

export function useStore<SomeStore extends Store>(
    store: SomeStore,
    { keys, deps = [store, keys] }: UseStoreOptions<SomeStore> = {},
): StoreValue<SomeStore> {
    let snapshotRef = useRef();
    snapshotRef.current = store.get();
    let subscribe = useCallback(
        (onChange: Function) =>
            (keys?.length as number) > 0
                ? listenKeys(
                      store as { setKey: (key: any, value: any) => void },
                      keys as StoreKeys<SomeStore>[],
                      emit(snapshotRef, onChange),
                  )
                : store.listen(emit(snapshotRef, onChange)),
        deps,
    );
    let get = () => snapshotRef.current;

    return useSyncExternalStore(subscribe, get, get) as StoreValue<SomeStore>;
}
