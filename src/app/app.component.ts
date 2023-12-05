import { Component } from '@angular/core';
import { init as initApm } from '@elastic/apm-rum'

const apmAppData = {
  serviceName: 'RUM-UI', // specify service name for RUM
  projectName: 'rum-test', // provide the snappyflow project name from step 4
  appName: 'rum-test', // provide the snappyflow application name from step 4
  profileId: 'ttdy79fe',
  //serverUrl: "https://add-component-test-sf-lb-8fd0571029bb08f5.elb.us-west-2.amazonaws.com:8200",
  serverUrl: "http://192.168.56.102:8200"
};

const apmSaaSData = {
  serviceName: 'RUM-UI',
  serverUrl: "https://stage-saas-setup-portal-alb-910865198.us-west-2.elb.amazonaws.com/sftrace",
  projectName: 'testkey_project',
  appName: 'java_trace',
  profileId: 'piwqxxt4',
}

const saasMode = false;
const traceMode = false;

const apmData = saasMode ? apmSaaSData : apmAppData;

const apm = initApm({

  // Set required service name (allowed characters: a-z, A-Z, 0-9, -, _, and space)
  serviceName: apmData.serviceName,

  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: apmData.serverUrl,
  distributedTracing: false,
  breakdownMetrics: true,
  session: true
})

apm.addLabels({ '_tag_appName': apmData.appName });
apm.addLabels({ '_tag_projectName': apmData.projectName });
apm.addLabels({ '_tag_profileId': apmData.profileId });
if (!traceMode) apm.addLabels({ '_tag_agent': 'rum' });

@Component({
  selector: 'cm-app-component',
  templateUrl: './app.component.html'
})
export class AppComponent {

}
