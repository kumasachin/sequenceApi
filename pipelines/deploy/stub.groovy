/*
 * Author: Abhay Chrungoo <abhay@ziraffe.io>
 * Contributing HOWTO: TODO
 */
def deploy(String targetBranch, context){
	node(){
		this.deployHandler(targetBranch, context)
	}
}
def purge(String targetBranch, context) {
	if(! targetBranch.startsWith('master')){
		node() {
			this.purgeHandler(targetBranch, context)
		}
	}
}

def name(){
	return "bluemix"
}

def purgeHandler(String targetBranch, context) {
	
}

def deployHandler(String targetBranch, context){
	
}

return this;
