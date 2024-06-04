import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageAdapter {


    static async getItem(key){
        try {
            const candidates =  await AsyncStorage.getItem(key); 
            return  (candidates!== null) ? JSON.parse(candidates) : []
        } catch (error) {
            return [];
        }
    }

    static async setItem(key, value){
        try {

            await AsyncStorage.setItem(key, JSON.stringify(value));

        } catch(error) {
            throw new Error(`Error ${key}`);
        }
    }

    static async removeItem(key){
        try {
            await AsyncStorage.removeItem(key);
        } catch(error) {
            console.log(error);
        }
    }

}