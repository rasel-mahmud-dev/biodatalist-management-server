class Common {

    static collectionName  = ""

    constructor(collectionName: string) {
        Common.collectionName = collectionName
    }

    save(){
        return new Promise((resolve, reject)=>{
            let {collectionName, ...other} = this
            // get access mongodb collection and insert data

        })
    }

    static find(){

    }

    static findOne(){

    }
}


export default Common