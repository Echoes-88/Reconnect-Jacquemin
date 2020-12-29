import React from "react";
import "../App.css";
import axios from 'axios';
import names from "../names";
import "./index.css";

const apiEndpoint = "https://avatars.dicebear.com/v2/avataaars/";
const apiOptions = "options[mood][]=happy";
const backendUrl = "http://localhost:8000";
const beneficiariesEndpoint = `${backendUrl}/api/beneficiaries?format=json`;

const getAvatar = name => `${apiEndpoint}${name}.svg?${apiOptions}`;

function Home() {

    // USER STATE
    const [userInformations, setUserInformations] = React.useState([]);

    const [isLogged, setisLogged] = React.useState(false);

    // UNREGISTERED BENEFICIARIES

        // Unregistered Beneficiaries state
        const [inputUnregisteredBeneficiaries, setInputUnregisteredBeneficiaries] = React.useState("");
        
        const [unregisteredBeneficiaries, setUnregisteredBeneficiaries] = React.useState([]);

        const [filteredBeneficiaries, setFilteredBeneficiaries] = React.useState([]);


        // filter unregistered beneficiaries function
        const filterUnregisteredBeneficiaries = async (e) => {

            setInputUnregisteredBeneficiaries(e.target.value)

            if(inputUnregisteredBeneficiaries.length <= 1) {
                setFilteredBeneficiaries(unregisteredBeneficiaries)
            } else {
                setFilteredBeneficiaries(unregisteredBeneficiaries.filter((beneficiary) => (
                    beneficiary.name.includes(inputUnregisteredBeneficiaries)
                )));
            }
        };

    // REGISTERED BENEFICIARIES

        // Fetch registered beneficiaries
        const fetchBeneficiaries = async () => {

            const beneficiaries = await axios.get(beneficiariesEndpoint);
            setRegisteredBeneficiaries(beneficiaries.data['hydra:member'])
        };

        // Registered Benefericiaries state
        const [inputRegisteredBeneficiaries, setInputRegisteredBeneficiaries] = React.useState("");

        const [registeredBeneficiaries, setRegisteredBeneficiaries] = React.useState([]);

        // filter registered beneficiaries function
        const filterRegisteredBeneficiaries = async (e) => {

            setInputRegisteredBeneficiaries(e.target.value)

            const beneficiaries = await axios.get(beneficiariesEndpoint)

            if(inputRegisteredBeneficiaries.length <= 1) {
                setRegisteredBeneficiaries(beneficiaries.data['hydra:member'])
            } else {
                setRegisteredBeneficiaries(beneficiaries.data['hydra:member'].filter((beneficiary) => (
                    beneficiary.name.includes(inputRegisteredBeneficiaries)
                )));
            }
        };

    // ADD AND DELETE BENEFICIARY IN DATABASE
    const addBeneficiaries = async (name) => {
        await axios.post('http://localhost:8000/api/beneficiaries', {
            name: name
        });
        fetchBeneficiaries()
    };

    const deleteBeneficiary = async (id) => {
        await axios.delete(`http://localhost:8000/api/beneficiaries/${id}`);
        fetchBeneficiaries()
    };

    // USE EFFECT ON LOAD
    React.useEffect(() => {

        // Looking for token in local storage
        if(localStorage.getItem('token')) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            setUserInformations(localStorage.getItem('email'))
            setisLogged(true);

            fetchBeneficiaries();

        // Generating unregistered Beneficiaries
        const unregistered = [...Array(12).keys()].map(number => ({
            name: names[Math.floor(Math.random() * names.length)]
        }))

        setUnregisteredBeneficiaries(unregistered);
        setFilteredBeneficiaries(unregistered)
        }
    }, [isLogged]);

    return (
        <>
        <h1>Bienvenue dans le gestionnaire de bénéficaires Reconnect</h1>
            <hr/>

            {!isLogged && 
                <a href="/login">
                    <button>Connexion à la plateforme</button>
                </a>
            }

            {isLogged && (
                <>
                <div>
                    <p>Vous êtes connecté !</p>
                    <p>Votre email : {userInformations}</p>
                </div>

                <hr/>
                <h3>Personnes stockées en base</h3>

                <form className="SearchBar">
                    <label>Recherche</label>
                    <input type="text" placeholder="nom utilisateur" value={inputRegisteredBeneficiaries} onChange={filterRegisteredBeneficiaries} />
                </form>

                <div className="Beneficiaries-list">
                    {registeredBeneficiaries.map((beneficiary) => (
                        <div className="Beneficiary-card" key={beneficiary.id}>
                            <img src={getAvatar(beneficiary.name)} alt={beneficiary.name}/>
                            <span>{beneficiary.name}</span>
                            <button onClick={e => deleteBeneficiary(beneficiary.id)}>Supprimer de la BDD</button>
                        </div>
                    ))}
                </div>
                <hr/>
                <h3>Personnes non stockées</h3>

                <form className="SearchBar">
                    <label>Recherche</label>
                    <input type="text" placeholder="nom utilisateur" value={inputUnregisteredBeneficiaries} onChange={filterUnregisteredBeneficiaries} />
                </form>

                <div className="Beneficiaries-list">
                    {filteredBeneficiaries.map((beneficiary, index) => (
                        <div className="Beneficiary-card" key={beneficiary.name + index}>
                            <img src={getAvatar(beneficiary.name)} alt={beneficiary.name}/>
                            <span>{beneficiary.name}</span>
                            <button onClick={e => addBeneficiaries(beneficiary.name)}>Ajouter à la BDD</button>
                        </div>
                    ))}
                </div>
                </>
        )};
        </>
)}

export default Home;