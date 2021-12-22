import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, FirestoreDataConverter, DocumentData } 
        from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function Home() {

    const citiesRef = collection(db, "cities");
    
    getCities();
    
    return "GET CITIES";

    async function getCitie() {
        const ref = doc(db, "cities", "LA").withConverter(cityConverter);
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            const city = docSnap.data();
            console.log("CIDADE: "+city.toString());
        } else {
            console.log("No such document!");
        }
    }

    async function getCities() {
        const citiesCol = collection(db, 'cities').withConverter(cityConverter);
        const citiesSnapshot = await getDocs(citiesCol);
        const cities = citiesSnapshot.docs.map(doc => doc.data());
        if (cities.length > 0) {
            for (const city of cities) {
                console.log("Nome: "+city.toString());
            }
        } else {
            console.log("No such document!");
        }
    }

    async function setCities() {
        await setDoc(doc(citiesRef, "SF"), {
            name: "San Francisco", state: "CA", country: "USA",
            capital: false, population: 860000,
            regions: ["west_coast", "norcal"]
        });
        await setDoc(doc(citiesRef, "LA"), {
            name: "Los Angeles", state: "CA", country: "USA",
            capital: false, population: 3900000,
            regions: ["west_coast", "socal"]
        });
        await setDoc(doc(citiesRef, "DC"), {
            name: "Washington, D.C.", state: null, country: "USA",
            capital: true, population: 680000,
            regions: ["east_coast"]
        });
        await setDoc(doc(citiesRef, "TOK"), {
            name: "Tokyo", state: null, country: "Japan",
            capital: true, population: 9000000,
            regions: ["kanto", "honshu"]
        });
        await setDoc(doc(citiesRef, "BJ"), {
            name: "Beijing", state: null, country: "China",
            capital: true, population: 21500000,
            regions: ["jingjinji", "hebei"]
        });
    }

}

class City {
    public name: string;
    public state: string;
    public country: string;

    constructor(name, state, country) {
        this.name = name;
        this.state = state;
        this.country = country;
    }
    toString() {
        return this.name + ', ' + this.state + ', ' + this.country;
    }
}

// Firestore data converter
const cityConverter: FirestoreDataConverter<City> = {
    toFirestore: (city: City): DocumentData => {
        return {
            name: city.name,
            state: city.state,
            country: city.country
        };
    },
    fromFirestore: (snapshot): City => {
        const data = snapshot.data();
        return new City(data.name, data.state, data.country);
    }
};

// const cityConverter: FirestoreDataConverter<City> = {
//     toFirestore: (city: City): DocumentData => {
//         return {
//             name: city.name,
//             state: city.state,
//             country: city.country
//         };
//     },
//     fromFirestore: (snapshot, options): City => {
//         const data = snapshot.data(options);
//         return new City(data.name, data.state, data.country);
//     }
// };
