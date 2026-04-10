import { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../services/supabaseClient.jsx';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined);

    {/* Sign Up Function*/}
    const signUpNewUser = async (first_name, last_name, email, password, phone_number, date_of_birth, gender) => {
        const { data, error } = await supabase.auth.signUp({
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password, 
            phone_number: phone_number,
            date_of_birth: date_of_birth,
            gender: gender
        });

        if (error) {
            console.error('Error signing up new user:', error);
            return { Success: false, error };
        }

        return { Success: true, data };
    };

    {/* Sign In Function*/}
    const signInUser = async ({ email, password }) => {
        try {
            const {data, error} = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
               console.error('Sign in error occurred: ', error);
               return { success: false, error: error.message }; 
            }

            console.log('User signed in successfully:', data);
            return { success: true, data };

        } catch (error) {
            console.error('Error signing in user:', error);
        }
    }

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    {/*Sign Out Function*/}
    const signOut = () => {
        const { error } = supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error);
        }
    }

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
}