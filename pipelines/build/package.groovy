/*
 * Author: Abhay Chrungoo <abhay@ziraffe.io>
 * Contributing HOWTO: TODO
 */
def pack(String targetBranch, String targetEnv, context){
	node(){
		checkout scm
		this.packHandler(targetBranch,  targetEnv, context)
	}
}
def packHandler(String targetBranch, String targetEnv, context){
	def artifact = this.artifactName(targetBranch, targetEnv, context)
	def packagingOptions = context.config.packaging.npm_options?: ''
	try {

		sh "pipelines/scripts/setup-environment.sh  ${packagingOptions}"
		sh """rm -rf j2 && mkdir -p j2  && \\
				tar --warning=file-changed \\
				--exclude='./*.tar.gz' \\
				--exclude='.git/*' \\
				--exclude='pipelines' \\
				--exclude='Jenkinsfile' \\
				--exclude='./coverage/*' \\
				--exclude='./j2/*' \\
				-zcf j2/${artifact} \\
				.
		"""
		dir('j2'){
			stash name: "artifact-${context.application}-${targetBranch}", includes: artifact
			archive artifact
		}
	} catch (error) {
		echo "FAILED: BUilding tarball"
		throw error
	} finally {
		step([$class: 'WsCleanup', notFailBuild: true])
	}
}
def publishNexus(String targetBranch, String targetEnv, context){
	node() {
		this.publishNexusHandler(targetBranch, targetEnv, context)
	}
}
def publishNexusHandler(String targetBranch, String targetEnv, context){
	def nexusURL = context.config.nexus.url ?: 'http://invalid.url/'
  	def tagName = context.config.tag ? context.config.tag : 'latest'
	echo "PUBLISH: ${this.name()} to ${nexusURL} "
	withCredentials([string(credentialsId: context.config.nexus.publish_auth, variable: 'npm_auth')]) {
	try {
		checkout scm
		sh """	source pipelines/scripts/functions && \\
				npm3 publish --registry ${nexusURL} --tag ${tagName}"""
	} catch (error) {
		echo "Failed to publish artifact to Nexus"
	} finally {	step([$class: 'WsCleanup', notFailBuild: true]) }
}
}
def name(){
	return "npm3"
}

//Optional Methods. Not part of Signature
String revision(){
	return sh(returnStdout: true, script: 'git rev-parse --short HEAD').trim()
}

String artifactName(String targetBranch, String targetEnv, context) {
	return ("${targetBranch}-${context.application}-artifact-"
			+ env.BUILD_NUMBER
			+ '-'
			+ this.revision()
			+ ".tar.gz")
}

return this;
