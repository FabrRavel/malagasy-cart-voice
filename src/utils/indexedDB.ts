
// Fonction pour initialiser la base de données IndexedDB
export function initIndexedDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('malagasyCartDB', 1);
    
    request.onerror = () => {
      console.error("Erreur d'ouverture de la base de données");
      reject(new Error("Erreur d'ouverture de la base de données"));
    };
    
    request.onsuccess = () => {
      console.log('Base de données ouverte avec succès');
      resolve(request.result);
    };
    
    request.onupgradeneeded = (event) => {
      const db = request.result;
      
      // Créer les object stores si nécessaire
      if (!db.objectStoreNames.contains('cart')) {
        db.createObjectStore('cart', { keyPath: 'id', autoIncrement: true });
      }
      
      if (!db.objectStoreNames.contains('purchases')) {
        db.createObjectStore('purchases', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

// Sauvegarder des données dans IndexedDB
export function saveDataToIndexedDB(storeName: string, data: any) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('malagasyCartDB', 1);
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(storeName, 'readwrite');
      const store = transaction.objectStore(storeName);
      
      // Vider le store actuel (pour le panier et les achats)
      store.clear();
      
      // Ajouter les nouvelles données
      const addRequest = store.add({ id: 1, data });
      
      addRequest.onsuccess = () => {
        resolve(true);
      };
      
      addRequest.onerror = () => {
        reject(new Error("Erreur lors de l'ajout de données"));
      };
    };
    
    request.onerror = () => {
      reject(new Error("Erreur d'ouverture de la base de données"));
    };
  });
}

// Récupérer des données depuis IndexedDB
export function getDataFromIndexedDB(storeName: string) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('malagasyCartDB', 1);
    
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(storeName, 'readonly');
      const store = transaction.objectStore(storeName);
      const getAllRequest = store.getAll();
      
      getAllRequest.onsuccess = () => {
        if (getAllRequest.result.length > 0) {
          resolve(getAllRequest.result[0].data);
        } else {
          resolve(null);
        }
      };
      
      getAllRequest.onerror = () => {
        reject(new Error("Erreur lors de la récupération des données"));
      };
    };
    
    request.onerror = () => {
      reject(new Error("Erreur d'ouverture de la base de données"));
    };
  });
}
