@Library('workflowlib-sandbox@jenkinsaoo')
import com.lbg.workflow.sandbox.*

properties([
	buildDiscarder(logRotator(artifactDaysToKeepStr: '30', artifactNumToKeepStr: '10', daysToKeepStr: '30', numToKeepStr: '10')),
	[$class: 'RebuildSettings', autoRebuild: true, rebuildDisabled: false]
])

def builder = 'pipelines/build/package.groovy'
def deployer = 'pipelines/deploy/stub.groovy'
def unitTests = 	  [	'pipelines/tests/unit.groovy']
def staticAnalyses =  [	'pipelines/tests/sonar.groovy' ]
def integrationTests = [ 'pipelines/tests/ping.groovy']


String notify = 'LloydsCJTAOOFT1ONBOARDING@sapient.com,lloydscjtdevops@sapient.com'
Integer timeout = 30
def configuration = "pipelines/conf/job-configuration.json"
BuildHandlers handlers = new ConfigurableBuildHandlers(	builder,
							deployer,
							unitTests,
							staticAnalyses,
							integrationTests) as BuildHandlers

invokeBuildPipelineHawk( 'aoo-cwa-init', handlers, configuration, notify , timeout )
