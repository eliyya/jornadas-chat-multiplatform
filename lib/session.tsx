import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

const SessionContext = createContext<{ username: string | null, setUsername: Dispatch<SetStateAction<string | null>> } | null>(null)

interface SessionProviderProps {
    children: ReactNode
}
export function SessionProvider({ children }: SessionProviderProps) {
    const [username, setUsername] = useState<string | null>(null)

    return (
        <SessionContext.Provider value={{ username, setUsername }}>
            {children}
        </SessionContext.Provider>
    )
}

export function useSession() {
    const context = useContext(SessionContext)!
    return context
}
