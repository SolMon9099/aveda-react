export function fileToBase64(file: File){ // retorna o base64 do arquivo
    return new Promise(function (resolve, reject) {
        try {
            let reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = async (e) => {
                resolve(e.target?.result)
            }
        
        } catch (error) {
            reject(error)
        }

    });
}