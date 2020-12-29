import React from "react";
import "../App.css";
import axios from 'axios';
import names from "../names";

const apiEndpoint = "https://avatars.dicebear.com/v2/avataaars/";
const apiOptions = "options[mood][]=happy";
const backendUrl = "http://localhost:8000";
const beneficiariesEndpoint = `${backendUrl}/api/beneficiaries?format=json`;

const getAvatar = name => `${apiEndpoint}${name}.svg?${apiOptions}`;

function Home() {

    // user state
    const [userInformations, setUserInformations] = React.useState([]);

    const [isLogged, setisLogged] = React.useState(false);

    const [registeredBeneficiaries, setRegisteredBeneficiaries] = React.useState(
        []
    );

    const fetchBeneficiaries = async () => {

        const beneficiaries = await axios.get(beneficiariesEndpoint);
        setRegisteredBeneficiaries(beneficiaries.data['hydra:member'])
    };

    // useEffect on load page
    React.useEffect(() => {

        // Looking for token in local storage
        if(localStorage.getItem('token')) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            setUserInformations(localStorage.getItem('email'))
            setisLogged(true);

            fetchBeneficiaries();
        }
    }, [isLogged]);

    const beneficiaryNames = [...Array(12).keys()].map(number => ({
        name: names[Math.floor(Math.random() * names.length)]
    }));

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
                <div className="Beneficiaries-list">
                    {registeredBeneficiaries.map((beneficiary) => (
                        <div className="Beneficiary-card" key={beneficiary.id}>
                            <img src={getAvatar(beneficiary.name)} alt={beneficiary.name}/>
                            <span>{beneficiary.name}</span>
                        </div>
                    ))}
                </div>
                <hr/>
                <h3>Personnes non stockées</h3>
                <div className="Beneficiaries-list">
                    {beneficiaryNames.map((beneficiary, index) => (
                        <div className="Beneficiary-card" key={beneficiary.name + index}>
                            <img src={getAvatar(beneficiary.name)} alt={beneficiary.name}/>
                            <span>{beneficiary.name}</span>
                        </div>
                    ))}
                </div>
                </>
        )};
        </>
)}

export default Home;