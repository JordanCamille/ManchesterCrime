angular.module('appCrimeMaps')
    .factory('loadDataCrimeService',function loadDataFromCSV($http,$q)
    {
    	var data=null;
    	var dataGoogleAPI=[];
    	var dataD3js=null;
    	var monthList=[];

    	monthList["01"] = "January";
		monthList["02"] = "February";
		monthList["03"] = "March";
		monthList["04"] = "April";
		monthList["05"] = "May";
		monthList["06"] = "June";
		monthList["07"] = "July";
		monthList["08"] = "August";
		monthList["09"] = "September";
		monthList["10"] = "October";
		monthList["11"] = "November";
		monthList["12"] = "December";

    	var typeCrime= [];

		typeCrime["ASB"] = "Anti-social behaviour";
		typeCrime["BU"] = "Burglary";
		typeCrime["VC"] = "Vehicle crime";
		typeCrime["VSO"] = "Violence and sexual offences";
		typeCrime["OT"] = "Other theft";
		typeCrime["CDA"] = "Criminal damage and arson";
		typeCrime["PO"] = "Public order";
		typeCrime["DRU"] = "Drugs";
		typeCrime["ROB"] = "Robbery";
		typeCrime["SHO"] = "Shoplifting";
		typeCrime["POW"] = "Possession of weapons";
		typeCrime["TOP"] = "Theft from the person";
		typeCrime["OC"] = "Other crime";
		typeCrime["BT"] = "Bicycle theft";

		function initDataObject()
		{
			var obj={month:[]};
			var monthValue;
			var arrayObject;
			for(var key in monthList)
			{
				monthValue=monthList[key];
				arrayObject={};
				arrayObject["month"]=new Date(key);
				obj.month[monthValue];
				for(keyCrime in typeCrime)
				{
					arrayObject[keyCrime]=0;
				}
				obj.month[monthValue]=arrayObject;
			}

			var month= [];

			dataD3js=obj;
		};

  		return {
  	 	getDataD3js:function(){
  	 		return dataD3js;	
  	 	},
  	 	getDataGoogleAPI:function(){
  	 		return dataGoogleAPI;	
  	 	},
    	loadData: function(callback){

    	var Url   =[];
    	Url="ressources/dataCrime/manchester_cirme_2015.csv";
    	initDataObject();
    	var self = this;
    	var Items=[];
    	var csvFormatted=[];
    	
		var promise= $http.get(Url).then(function(response){
		var allTextLines = response.data.split(/\r\n|\n/);
	  	allTextLines.splice(0,1);
	  	
	  	Items= self.csvParser(allTextLines);
	  	
	  	data=Items;

  	});
		return promise;
    	   },

   	csvParser :function(allTextLines) {
   		
    var headers = allTextLines[0].split(',');
    var lines = [];
    var month;
    var keyCrime;
    var self = this;
    var titleMarker="";
    
    for ( var i = 0; i < allTextLines.length; i++) {
        // split content based on comma
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
            var tarr = [];
            var date=data[1].split('-');
            
            
            keyCrime=self.getKeyTypeCrime(data[9]);
            dataD3js.month[monthList[date[1]]][keyCrime]+=1;
            titleMarker=data[1] +", "+data[9];

            //data limitation because of google map's crash
            if (i < 100) {
            	dataGoogleAPI.push({id:i,title:titleMarker,last_outcome:data[10],coord:{latitude:data[5], longitude:data[4]}});          
            }
            
        }
    }
    
},
	getKeyTypeCrime: function(valueOfTable)
	{
		var val;
		for (var key in typeCrime) {
        val = typeCrime[key];
        if(val == valueOfTable)
            return key;
	    }
	}
};
});