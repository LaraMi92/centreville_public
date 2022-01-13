import { firestore } from "../../firebase/utils";

export const handleSaveOrder = (order) => {
    return new Promise((resolve, reject) => {
        firestore.collection('orders')
        .doc()
        .set(order)
        .then(() => {
            resolve()
        })
        .catch((error) => {
            reject(error)
        })
    })
};

export const handleGetUserOrderHistory = (user) => {
    return new Promise((resolve, reject) => {
        let ref = firestore.collection("orders").orderBy('orderCreatedDate');
        ref = ref.where('orderUserId', '==', user);

        ref.get()
        .then((result) => {
            const data = [...result.docs.map(document => {
                return {
                    ...document.data(),
                    documentId: document.id
                }
            })]
            resolve({data})
        })
        .catch(error => {
            reject(error)
        })
    });
};

export const getOrdersAdmin = () => {
    return new Promise((resolve, reject) => {
        let ref = firestore.collection('orders').orderBy("orderCreatedDate").limit(30);
        
        ref.get()
        .then((result) => {
            const data = [...result.docs.map(document => {
                return {
                    ...document.data(),
                    documentId: document.id
                }
            })]
            resolve({data})
        })
        .catch(error => {
            reject(error)
        })

    })
}