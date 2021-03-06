import { Component, enableProdMode } from '@angular/core';

import {
  Service,
  Task,
  Dependency,
  Resource,
  ResourceAssignment,
} from './app.service';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Service],
  preserveWhitespaces: true,
})
export class AppComponent {
  tasks: Task[];
  dependencies: Dependency[];
  resources: Resource[];
  resourceAssignments: ResourceAssignment[];
  scaleType: string;
  titlePosition: string;
  showResources: boolean;
  taskTooltipContentTemplate: (model: any) => string;

  constructor(service: Service) {
    this.tasks = service.getTasks();
    this.dependencies = service.getDependencies();
    this.resources = service.getResources();
    this.resourceAssignments = service.getResourceAssignments();
    this.scaleType = 'quarters';
    this.titlePosition = 'outside';
    this.showResources = true;
    this.taskTooltipContentTemplate = this.getTaskTooltipContentTemplate;
  }

  getTaskTooltipContentTemplate(model) {
    const timeEstimate = Math.abs(model.start - model.end) / 36e5;
    const timeLeft = Math.floor(((100 - model.progress) / 100) * timeEstimate);

    return (
      `<div class="template-header"> ${model.title} </div>` +
      `<p class="template-item"> <span> Estimate: </span> ${timeEstimate} <span> hours </span> </p>` +
      `<p class="template-item"> <span> Left: </span> ${timeLeft} <span> hours </span> </p>`
    );
  }

  onShowCustomTaskTooltip(e) {
    e.value
      ? (this.taskTooltipContentTemplate = this.getTaskTooltipContentTemplate)
      : (this.taskTooltipContentTemplate = undefined);
  }
}
