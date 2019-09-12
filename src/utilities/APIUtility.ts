import axios from 'axios'


class APIUtility {
    public GetData = (uri: string): Promise<any> => {
        const promise = new Promise((resolve: (value?: any) => void, reject: (error: string) => void) => {
            axios.get(uri, {})
                .then((response: any) => {
                    resolve(response);
                })
                .catch((error: any) => {
                    reject(error);
                })
        });

        return promise;
    }
}

export default APIUtility;