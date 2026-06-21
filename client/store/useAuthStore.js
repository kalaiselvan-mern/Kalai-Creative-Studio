import { LogIn } from "lucide-react";
import { Flag } from "lucide-react";
import { create  } from "zustand";
import { persist } from "zustand/middleware";


export const useAuthStore = create ( persist((set)=>({


     user :null ,
     token:null,
     isAuthenticated:false,
 
     login:(userData , jwtToken)=>{
        set({
            user:userData,
            token:jwtToken,
            isAuthenticated:true
        });
     },

     logout:()=>set({
           user :null ,
     token:null,
     isAuthenticated:false,
     }),
     updateUser: (newUserData) => {
        set((state) => ({
          user: { ...state.user, ...newUserData }
        }));
      }
    }),
    {
      name: 'kalai-auth-storage', 
    }
))