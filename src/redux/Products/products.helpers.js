import { firestore, FieldValue, FieldPath } from "../../firebase/utils";


export const handleAddProduct = (product) => {
    return new Promise((resolve, reject) => {
        firestore.collection('products')
        .doc()
        .set(product)
        .then(() => {
            resolve()
        })
        .catch(error => {
            reject(error)
        })
    })
};

export const handleFetchProducts = () => {
    return new Promise((resolve, reject) => {
        firestore.collection('products')
        .get()
        .then(snapshot => {
            const productsArray = snapshot.docs.map((doc) => {
                return {
                    ...doc.data(),
                    documentId: doc.id
                }
            })
            resolve(productsArray);
        })
        .catch(error => {
            reject(error);
        })
    })
}

export const handleDeleteProduct = (id) => {

    return new Promise((resolve, reject) => {
        firestore.collection('products')
        .doc(id)
        .update({
           category: FieldValue.delete(),
            title: FieldValue.delete(),
           picture: FieldValue.delete(), 
           type: FieldValue.delete(), 
           characteristics: FieldValue.delete(),
           price: FieldValue.delete(), 
           description: FieldValue.delete(), 
           tracklist: FieldValue.delete(),
            productAdminUserUID: FieldValue.delete(),
            createdAt: FieldValue.delete()
        })
        .then(() => {
            resolve();
        })
        .catch((error) => {
            reject(error);
        })
    })
};

export const handleDeleteProductFinish = (id) => {
   return new Promise((resolve, reject) => {

       firestore.collection('products').where(FieldPath.documentId(), '==', id)
       .get()
       .then(querySnapshot => {
           querySnapshot.forEach(doc => {
               doc.ref.delete().then(() => {
                   resolve()
               }).catch(error => {
                   reject(error);
               })
           })
       })
       .catch(error => {
        reject(error)
    })
   })
   
};

export const handleFetchProduct = productId => {
    return new Promise((resolve, reject) => {
        firestore.collection('products')
        .doc(productId)
        .get()
        .then(snapshot => {
            if(snapshot.exists){
                resolve(
                    snapshot.data()
                )
            }
        })
        .catch(error => {
            reject(error);
        })
    })
}