import { createContext, useEffect, useState, useContext } from 'react';
import { supabase } from '@services/supabaseClient.jsx';

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [session, setSession] = useState(undefined);
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        {/*Get Initial Session*/}
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setUser(data.session?.user ?? null);
            setLoading(false);
        };

        getSession();

        {/*Listen for auth changes*/}
        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user ?? null);
            }
        );

        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{session, user, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => {
    return useContext(AuthContext);
};