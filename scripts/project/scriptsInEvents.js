/*
*GAME -> APP
*----------------
*
* Creare un canale javascript "GameBridge" con le seguenti funzioni:
* 
* -exitGame()
* -showInterstitialAd(string ad-unit)
* -showRewardedAd(string ad-unit)
* 
*/

//Cliccato bottone per chiudere il gioco
function exitGame(){
    GameBridge.exitGame(); //Chiudere gioco in app
}

//Passo il nome della ad-unit come stringa
function showInterstitialAd(unit){
	GameBridge.showInterstitial(unit); //Mostrare in app ad interstitial
}

//Passo il nome della ad-unit come stringa
//Passo il reward in stringa (da rimandare nella chiamata "rewardedAd_Completed")
function showRewardedAd(unit, reward){
    GameBridge.showRewarded(unit, reward); //Mostrare in app ad rewarded
}

//APP -> GAME
//----------------

//Funzioni javascript da chiamare al gioco

//Adv finita, sia che dia errore o guardata correttamente, non ci importa
function interstitialAd_Completed(){
	runtime.callFunction("SDK_AD_interstitialCompleted")
}


//Adv finita, passare i seguenti parametri
//Success = true: se guardata fino alla fine e quindi prendi premio, false: non guardata fino alla fine, chiusa prima del premio, non disponibile, offline, qualsiasi altro errore
//Reward = "checkpoint", "bonus" etc... quale premio ottiene, preso dalla funzione showRewarded(...reward)
function rewardedAd_Completed(success, reward){
	runtime.callFunction("SDK_AD_rewardedCompleted", success, reward);
}


const scriptsInEvents = {

	async G_tools_Event4_Act1(runtime, localVars)
	{
function checkMailValidity(email) {
    const regex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})$/;
    return regex.test(email);
}
if(checkMailValidity(localVars.email)){
localVars.result = 1;
}else{localVars.result = 0};
	},

	async G_sdk_Event1_Act2(runtime, localVars)
	{
		showRewardedAd(localVars.unit, localVars.reward);
	},

	async G_sdk_Event13_Act2(runtime, localVars)
	{
		showInterstitialAd(localVars.unit);
	},

	async G_sdk_Event15_Act2(runtime, localVars)
	{
		exitGame();
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

