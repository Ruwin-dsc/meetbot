# :robot: **MeetBot by WhiteHall**

## :pencil: **Description**
Hey, voici un bot qui te permettra d'avoir un bot Tinter à ton serveur où les utilisateurs pourront faire des profils, demandes ou bien peut-être un match entre eux !

## :gear: **Fonctionnalités**
- système de Demande
- system de Like

## :wrench: **Configuration**

### **Prérequis**
- Discord.js (version 14.13.0)
- mysql (version 2.18.1)
- phpMyAdmin (voir étape instalation)

### **Étapes d'installation**
1. Clone le repository : `git clone https://github.com/Ruwin-dsc/meetbot.git`
2. Installe les dépendances : `npm install`
3. Utilise phpMyAdmin et met le fichier `meetbot.sql` dessus si tu n'as pas phpMyAdmin ou que tu ne sais pas l'utiliser je t'invite à te rendre dans le serveur https://discord.gg/w8FzTaXffc et demander un hébergeur avec phpMyAdmin pour le friends (de la part de ruwinou) C'EST TOTALEMENT GRATUIT !!! Toutefois si t'as d'autre problème je t'invite à te rendre dans le serveur https://discord.gg/w8FzTaXffc
4. Configure ton fichier de configuration `config.json` avec les informations nécessaires.
5. Lance le bot : `node index.js`

### **Configuration du fichier `config.json`**
```json
{
    "token": "Token",
    "prefix": "prefix",
    "owner": ["OWNER ID 1", "OWNER ID 2"],
    "linkbot": "LA BAH TU METS LE LIEN DU BOT oe ça va servir à rien c juste pour le style", 
        "BDD": {
        "note": "si tu ne comprend pas ce qu'il faut faire je te coneille d'aller voir le readme du github ou rejoindre le support https://discord.gg/w8FzTaXffc",
        "host": "127.0.0.1 || host du vps",     
        "user": "root || user du vps",
        "password": "Supprimer cette ligne si vous êtes pas sur vps",
        "database": "friends",
        "charset": "utf8mb4"
    },
    "salonhomme": "ID SALON HOMME",
    "salonfemme": "ID DALON FEMME"  

}
```
[screen](https://media.discordapp.net/attachments/1121718489829347358/1167004948064653322/Capture_decran_2023-10-26_a_09.40.43.png?ex=654c8d0d&is=653a180d&hm=70065556fa0f9ad8391a41c1333d4aec5c2a6075620544b3fa8c8a74d05ec936&=&width=1244&height=1638)

## :raised_hands: **Contribution**
Si tu souhaites contribuer à ce projet, n'hésite pas à ouvrir une pull request !

## :page_facing_up: **License**
Ce projet est sous license MIT. Voir le fichier `LICENSE` pour plus d'informations.
