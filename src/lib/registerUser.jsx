import { supabase } from '@services/supabaseClient.jsx';

export const registerUser = async (cleanData) => {

    try {
        
        {/*Step 1: Sign Up User*/}
        const { data, error } = await supabase.auth.signUp({
            email: cleanData.email,
            password: cleanData.password,
        });

        if(error) {
            throw new Error(error.message);
        }

        {/*Step 1.5: Handle Email Confirmation Case*/}
        if (!data.user) {
            return {
                success: false,
                message: "Please check your email to confirm your account",
            };
        }
        
        {/*Grabs user id from the auth.users table*/}
        const user = data.user;

        {/*Step 2: Insert additional user data*/}
        const { error: dbError } = await supabase
            .from('users')
            .insert([
                {
                    id: user.id,
                    first_name: cleanData.first_name,
                    last_name: cleanData.last_name,
                    phone_number: cleanData.phone_number,
                    date_of_birth: cleanData.date_of_birth,
                    gender: cleanData.gender,
                    role_id: cleanData.role_id,
                }
            ]);
        
        if (dbError) {
            throw new Error(dbError.message);
        };

        return {
            success: true,
            data: user
        };

    } catch (error) {
        return {
            success: false,
            message: error.message || "Registration failed",
        }
    }

};