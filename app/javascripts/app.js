var accounts;
var account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function switchToHooked3(_keystore) {

	console.log("switchToHooked3");

	var web3Provider = new HookedWeb3Provider({
	  host: "http://localhost:8545", // check in truffle.js
	  transaction_signer: _keystore
	});

	web3.setProvider(web3Provider);
}

//create Wallet
function RegisterUser() {
	
var metaset = StructStorage.deployed();

var fname 		= document.getElementById("fname").value;
var mname 		= document.getElementById("mname").value;
var lname 		= document.getElementById("lname").value;
var upassword 	= document.getElementById("password").value;
var aadharid 	= parseInt(document.getElementById("aadharid").value);
var caddress 	= document.getElementById("address").value;
var contact 	= parseInt(document.getElementById("contact").value);
var usertype 	= document.getElementById("selectUser").value;

setStatus("Initiating transaction... (please wait)");
  
	var msgResult;
	console.log("inside function");
	
	var secretSeed = lightwallet.keystore.generateRandomSeed();
		

	lightwallet.keystore.deriveKeyFromPassword(upassword, function (err, pwDerivedKey) {

		console.log("createWallet");
		
		console.log(secretSeed);
	
		var keystore = new lightwallet.keystore(secretSeed, pwDerivedKey);
		
		keystore.generateNewAddress(pwDerivedKey);
		// generate one new address/private key pairs
		// the corresponding private keys are also encrypted
		var address = keystore.getAddresses()[0];

		var privateKey = keystore.exportPrivateKey(address, pwDerivedKey);
		address1 = address;
		
	metaset.register( parseInt(address),fname,mname,lname,upassword,aadharid,caddress,contact,usertype, {from: account,gas:1500000}).then(function() {
    
		console.log("inside register");
		console.log(usertype);
		
	}).catch(function(e) {
    console.log(e);
    setStatus("Error setting value; see log.");
	});

		/* $("#wallet").html("0x"+address);
		$("#privateKey").html(privateKey);
		$("#balance").html(getBalance(address));
		*/
		
		console.log(address);
		console.log(privateKey);
		
		// Now set ks as transaction_signer in the hooked web3 provider
		// and you can start using web3 using the keys/addresses in ks!

		switchToHooked3(keystore);
		var lightwalletaddr = document.getElementById("lightwalletaddr");
		lightwalletaddr.innerHTML = address;
		
		

});
	
 metaset.fundaddr(parseInt(address), {from: account,gas:1000000}).then(function() {
    
  console.log("Account Funded!");
 
    
  }).catch(function(e) {
    console.log(e);
    setStatus("Error setting value; see log.");
  });
  
 /*  setTimeout(function(){
		
			refresh();
						  
		}, 8000); */
	
	// var address1 = keystore.getAddresses()[0];
//	console.log(address1);
	 
};


function set(){

var metaset = StructStorage.deployed();

var fid = document.getElementById("fid").value;
var fname = document.getElementById("fname").value;
var loc = document.getElementById("loc").value;
var crop = document.getElementById("crop").value;
var contact = parseInt(document.getElementById("contact").value);
var quantity = parseInt(document.getElementById("quantity").value);
var exprice = parseInt(document.getElementById("exprice").value);

setStatus("Initiating transaction... (please wait)");

metaset.produce( fid,fname,loc,crop,contact,quantity,exprice, {from: account,gas:400000}).then(function() {
    
  setStatus("Transaction complete!");
 
    
  }).catch(function(e) {
    console.log(e);
    setStatus("Error setting value; see log.");
  });
  
};

function refresh(){
	var metaset = StructStorage.deployed();
	var balance_element = document.getElementById("balance");
  
   metaset.getBalance.call(parseInt(account), {from: account,gas:400000}).then(function(value) {
    
    balance_element.innerHTML = value;
    console.log("Balance Updated!");
	
    
  }).catch(function(e) {
    console.log(e);
    setStatus("Error setting value; see log.");
  });	
	
}

function fund(){
	var meta = StructStorage.deployed();
	
	var amount = parseInt(document.getElementById("amount").value);
	var receiver = parseInt(document.getElementById("pfid").value);
	
    
  console.log("Initiating transaction... (please wait)");
  meta.sendCoin(receiver, amount, parseInt(account), {from: account,gas:700000}).then(function(values) {
    console.log("Transaction complete!");
  
  }).catch(function(e) {
    console.log(e);
    
  });
	setTimeout(function(){
		
			refresh();
						  
		}, 8000);
}

function get(){

var metaget = StructStorage.deployed();

var fid = document.getElementById("fid1").value;

setStatus("Initiating transaction... (please wait)");

metaget.getproduce.call( fid, {from: account}).then(function(value) {
  	
    
    var span_element2 = document.getElementById("getval2");
	var str = web3.toAscii(value[1]);
    span_element2.innerHTML = str;

	var span_element3 = document.getElementById("getval3");
	var str = web3.toAscii(value[2]);
    span_element3.innerHTML = str;	
 
	var str = web3.toAscii(value[3]);
	var span_element4 = document.getElementById("getval4");
	span_element4.innerHTML = str;

	var span_element5 = document.getElementById("getval5");
	span_element5.innerHTML = value[4].valueOf();

	var span_element6 = document.getElementById("getval6");
	span_element6.innerHTML = value[5].valueOf();
	
	var span_element7 = document.getElementById("getval7");
    span_element7.innerHTML = value[6].valueOf();
 
 setStatus("Transaction complete!");
    
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting value; see log.");
  });

  
};

function setQ(){

var metaset = StructStorage.deployed();

var lotno = document.getElementById("lotno").value;
var grade = document.getElementById("grade").value;
var mrp = parseInt(document.getElementById("mrp").value);
var testdate = document.getElementById("testdate").value;
var expdate = document.getElementById("expdate").value;


setStatus("Initiating transaction... (please wait)");

metaset.quality( lotno,grade,mrp,testdate,expdate, {from: account,gas:400000}).then(function() {
  setStatus("Transaction complete!");
	
 
	
    
  }).catch(function(e) {
    console.log(e);
    setStatus("Error setting value; see log.");
  });

 
  
};

function cgetQ(){

var metaget = StructStorage.deployed();
var lid = document.getElementById("lotnum").value;

setStatus("Initiating transaction... (please wait)");

metaget.getquality.call( lid,{from: account}).then(function(value) {
    
	var str = web3.toAscii(value[0]);
	var cspan_element1 = document.getElementById("cgetval8");
    cspan_element1.innerHTML = str;
 
	var str = web3.toAscii(value[1]);
	var cspan_element1 = document.getElementById("cgetval9");
    cspan_element1.innerHTML = str;

	var cspan_element1 = document.getElementById("cgetval10");
    cspan_element1.innerHTML = value[2].valueOf();

	var str = web3.toAscii(value[3]);
	var cspan_element1 = document.getElementById("cgetval11");
    cspan_element1.innerHTML = str;
	
	var str = web3.toAscii(value[4]);
	var cspan_element1 = document.getElementById("cgetval12");
    cspan_element1.innerHTML = str;

   setStatus("Transaction complete!");
    
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting value; see log.");
  });

  
};


function getQ(){

var metaget = StructStorage.deployed();
var fid = document.getElementById("getfid").value;

setStatus("Initiating transaction... (please wait)");


metaget.getproduce.call( fid,{from: account}).then(function(value) {
    	
	var cspan_element1 = document.getElementById("cgetval1");
    var cstr = web3.toAscii(value[0]);  
    cspan_element1.innerHTML = cstr;
 	
    var cspan_element2 = document.getElementById("cgetval2");
	var cstr = web3.toAscii(value[1]);
    cspan_element2.innerHTML = cstr;

	var cspan_element3 = document.getElementById("cgetval3");
	var cstr = web3.toAscii(value[2]);
	cspan_element3.innerHTML = cstr;
    
	var cstr = web3.toAscii(value[3]);
	var cspan_element4 = document.getElementById("cgetval4");
	cspan_element4.innerHTML = cstr;   
	
	var cspan_element5 = document.getElementById("cgetval5");
	cspan_element5.innerHTML = value[4].valueOf();

	var cspan_element6 = document.getElementById("cgetval6");
	cspan_element6.innerHTML = value[5].valueOf();	
   
	var cspan_element7 = document.getElementById("cgetval7");
	cspan_element7.innerHTML = value[6].valueOf();
   
   setStatus("Transaction complete!");
    
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting value; see log.");
  });

  
};

function printTransaction(txHash) {
	
  var txHash = web3.eth.getBlock("latest").transactions[0];
  var tx = web3.eth.getTransaction(txHash);
  
  if (tx != null) {
    console.log("  tx hash          : " + tx.hash + "\n"
      + "   nonce           : " + tx.nonce + "\n"
      + "   blockHash       : " + tx.blockHash + "\n"
      + "   blockNumber     : " + tx.blockNumber + "\n"
      + "   transactionIndex: " + tx.transactionIndex + "\n"
      + "   from            : " + tx.from + "\n" 
      + "   to              : " + tx.to + "\n"
      + "   value           : " + tx.value + "\n"
      + "   gasPrice        : " + tx.gasPrice + "\n"
      + "   gas             : " + tx.gas + "\n"
      + "   input           : " + tx.input);
  
  
  
  }
}

function printBlock() {
	
  var block = web3.eth.blockNumber;
  console.log("Block number     : " + web3.eth.blockNumber + "\n"
    + " hash            : " + web3.eth.getBlock(block).hash + "\n"
    + " parentHash      : " + web3.eth.getBlock(block).parentHash + "\n"
    + " nonce           : " + web3.eth.getBlock(block).nonce + "\n"
    + " sha3Uncles      : " + web3.eth.getBlock(block).sha3Uncles + "\n"
    + " logsBloom       : " + web3.eth.getBlock(block).logsBloom + "\n"
    + " transactionsRoot: " + web3.eth.getBlock(block).transactionsRoot + "\n"
    + " stateRoot       : " + web3.eth.getBlock(block).stateRoot + "\n"
    + " miner           : " + web3.eth.getBlock(block).miner + "\n"
    + " difficulty      : " + web3.eth.getBlock(block).difficulty + "\n"
    + " totalDifficulty : " + web3.eth.getBlock(block).totalDifficulty + "\n"
    + " extraData       : " + web3.eth.getBlock(block).extraData + "\n"
    + " size            : " + web3.eth.getBlock(block).size + "\n"
    + " gasLimit        : " + web3.eth.getBlock(block).gasLimit + "\n"
    + " gasUsed         : " + web3.eth.getBlock(block).gasUsed + "\n"
    + " timestamp       : " + web3.eth.getBlock(block).timestamp + "\n"
    + " transactions    : " + web3.eth.getBlock(block).transactions + "\n"
    + " uncles          : " + web3.eth.getBlock(block).uncles);
    if (web3.eth.getBlock(block).transactions != null) {
      console.log("--- transactions ---");
      web3.eth.getBlock(block).transactions.forEach( function(e) {
        printTransaction(e);
      })
    }
	
	var blocknum = document.getElementById("blocknum");
  blocknum.innerHTML = block.valueOf();
};

function redirect1(){
	 window.location.href = "register.html";
}

function redirect1(){
	 window.location.href = "index.html";
}
function redirect2(){
	 window.location.href = "microfinance.html";
}
function redirect3(){  
  
  $("#log-in-form").hide();
  $("#approve-form").show();
  
}

function loginuser(){
	var metaset 	= StructStorage.deployed();
	var userid 		= document.getElementById("username").value;
	var password1 	= document.getElementById("password").value;
  
   metaset.getusertype.call(parseInt(userid), {from: account}).then(function(value) {
    
    var pass = web3.toAscii(value[0]);
	var str = web3.toAscii(value[1]);
	console.log(pass);
	console.log(str);
	if ((password1.localeCompare(pass)==0)&& str.localeCompare("farmer")==0){
	console.log("true");
	window.location.href = "CropDetails.html";
	}
	else if ((password1.localeCompare(pass)==0)&& str.localeCompare("consumer")==0){
	console.log("true");
	window.location.href = "ListFarmer.html";
	}
    else if ((password1.localeCompare(pass)==0)&& str.localeCompare("government")==0){
	console.log("true");
	window.location.href = "quality.html";
	}
    
    
  }).catch(function(e) {
    console.log(e);
    setStatus("Error setting value; see log.");
  });	
}


window.onload = function() {
		
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];
	
	

  });
}