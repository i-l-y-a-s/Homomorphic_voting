import $ from 'jquery'
import axios from 'axios'
import paillier from 'paillier-js'
import SHA256  from  'crypto-js/sha256';
import  CryptoJS from 'crypto-js'
import  macSha256 from 'crypto-js/hmac-sha256'
import BigInt from "big-integer"
//import {Redirect} from 'react-router-dom';

 class ApiService{
    authenticate(username, password, callback){
        var formData = new FormData();
        formData.set('username', username);
        formData.set('password', password);
        axios({
            method: 'post',
            url: "http://localhost:5000/api/signin",
            data: formData,
            withCredentials: true
        }).then(res => {
            callback(res.data);
        }).catch(error => {
            alert(error);
        });
    }

    createElection(electionName, question,options, voters, publicKey, encrypted_0, callback){
        var formData = new FormData();
        formData.set('name', electionName);
        formData.set('question', question);
        formData.set('options', options);
        formData.set('voters', voters);
        formData.set('public_key',publicKey);
        formData.set('encrypted_0', encrypted_0);
        axios({
            method: 'post',
            url: "http://localhost:5000/api/election/create",
            data: formData,
            withCredentials: true
        }).then(res => {
            callback(res.data);
        }).catch(error => {
            alert(error);
        });
    }

    electionLis(callback){
        axios({
            method: 'get',
            url: "http://localhost:5000/api/election/list",
            withCredentials: true
        }).then(res => {
            callback(res.data);
        }).catch(error => {
            alert(error);
        });
    }
    register(username, password, callback){
        var formData = new FormData();
        formData.set('username', username);
        formData.set('password',password);
        axios({
            method: 'post',
            url: `http://localhost:5000/api/signup`,
            data: formData,
            withCredentials: true
        }).then(res => {
            callback(res.data)
        }).catch(error => {
            console.log(error);
        });
    }

    generatePublicPrivateKey() {
        const {publicKey, privateKey} = paillier.generateRandomKeys(1024);
        return [publicKey, privateKey];
    }

    constructPrivateKey(private_key) {
        var key_splits = private_key.split("/")
        for(var i = 0; i < key_splits.length; i++) {
            key_splits[i] = BigInt(key_splits[i]);
        }
        const publicKey = new paillier.PublicKey(key_splits[4], key_splits[5]);
        const privateKey = new paillier.PrivateKey(key_splits[0], key_splits[1], key_splits[2], key_splits[3], publicKey);
        return privateKey;
    }

    countTallies(election, n, privateKey, options, callback) {
        var l = Math.ceil(Math.log2(n + 1))
        this.getTally(election, function(data) {
            var result = {};
            var tally = data.tally;
            tally = privateKey.decrypt(BigInt(tally));
            console.log(tally)
            console.log(options)
            result = []
            for(var i = 0; i < options.length; i++) {
                var mask = (Math.pow(2, l) - 1) << (l * i);
                result[options[i]] = (tally & mask) >> (l * i);
                result.push(result[options[i]])
            }
            var formData = new FormData();
            formData.set('election', election);
            formData.set('result', result.join(";"));
            axios({
                method: 'post',
                url: `http://localhost:5000/api/election/postResult`,
                data: formData,
                withCredentials: true
            }).then(res => {
                
            }).catch(error => {
                console.log(error);
            });
            callback(result);
        });
    }

    getTally(election, callback){
        var formData = new FormData();
        formData.set('election', election);
        axios({
            method: 'post',
            url: `http://localhost:5000/api/election/tally`,
            data: formData,
            withCredentials: true
        }).then(res => {
            callback(res.data)
        }).catch(error => {
            console.log(error);
        });
    }

    manageVote(vote_array, election, n, public_key, callback) {
        var  vote = 0;
        var  v = 0
        var l = Math.ceil(Math.log2(n + 1))
        for(var i = 0; i < vote_array.length; i++) {
            vote += vote_array[i] << (l * i);
        }

        const publicKey = new paillier.PublicKey(BigInt(public_key.split("/")[0]), BigInt(public_key.split("/")[1]));

        var encrypted_vote = publicKey.encrypt(vote);

        // send encrypted vote              
        let randomKey= Math.floor(Math.random()*100000); 
        // random
        let hashedVote= CryptoJS.HmacSHA1(vote_array.toString(), randomKey.toString());

        var formData = new FormData();
        formData.set('election', election);
        formData.set('vote', encrypted_vote);
        formData.set('hashed_vote', hashedVote)
        axios({
            method: 'post',
            url: `http://localhost:5000/api/election/vote`,
            data: formData,
            withCredentials: true
        }).then(res => {
            callback(res.data)
        }).catch(error => {
            console.log(error);
        });
       

        return [
            hashedVote,
            randomKey
        ]
    }

    getResults(election, callback){
        var formData = new FormData();
        formData.set('election', election);
        axios({
            method: 'post',
            url: "http://localhost:5000/api/election/result",
            withCredentials: true,
            data: formData
        }).then(res => {
            callback(res.data);
        }).catch(error => {
            alert(error);
        });
    }
   
}


export default new ApiService();
