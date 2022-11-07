import { useCallback, useState } from "react"

function useHttp() {
    const [isLoading, setIsLoading] = useState<boolean | null>(false);
    const [error, setError] = useState<boolean | null>(null);

    const sendRequest = useCallback( async (requestConfig:{url:string; method?:string|undefined; headers?:any; body?:any},applyData:(data:any)=>any)=>{
        setIsLoading(true);
        setError(null);
        try{
            const response = await fetch( requestConfig.url, {
                method: requestConfig.method? requestConfig.method:'GET',
                headers: requestConfig.headers ? requestConfig.headers:{},
                body: requestConfig.body? JSON.stringify(requestConfig.body): null
            })

            if(!response.ok){
                throw new Error('Request failed!');
            }
            const data = await response.json();
            applyData(data);
            
        }catch(err:any){
            setError(err.message || 'Somthing went wrong!')
        }
    },[])
  return {
    error,
    isLoading,
    sendRequest
  }
}

export default useHttp
