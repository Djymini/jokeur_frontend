'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">jokeur-frontend documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#components-links"' :
                            'data-bs-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/AppComponent.html" data-type="entity-link" >AppComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppointmentAddDialogComponent.html" data-type="entity-link" >AppointmentAddDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppointmentDeleteDialogComponent.html" data-type="entity-link" >AppointmentDeleteDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppointmentModifyDialogComponent.html" data-type="entity-link" >AppointmentModifyDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/AppointmentPage.html" data-type="entity-link" >AppointmentPage</a>
                            </li>
                            <li class="link">
                                <a href="components/AppointmentSectionComponent.html" data-type="entity-link" >AppointmentSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/BreadcrumbComponent.html" data-type="entity-link" >BreadcrumbComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CalendarComponent.html" data-type="entity-link" >CalendarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/CalendarPage.html" data-type="entity-link" >CalendarPage</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardAnimalComponent.html" data-type="entity-link" >DashboardAnimalComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardAppointmentComponent.html" data-type="entity-link" >DashboardAppointmentComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardNewsComponent.html" data-type="entity-link" >DashboardNewsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardPage.html" data-type="entity-link" >DashboardPage</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardPage-1.html" data-type="entity-link" >DashboardPage</a>
                            </li>
                            <li class="link">
                                <a href="components/DashboardReminderComponent.html" data-type="entity-link" >DashboardReminderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/DateCardComponent.html" data-type="entity-link" >DateCardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/FooterComponent.html" data-type="entity-link" >FooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForgotPasswordComponent.html" data-type="entity-link" >ForgotPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ForgotPasswordPage.html" data-type="entity-link" >ForgotPasswordPage</a>
                            </li>
                            <li class="link">
                                <a href="components/HeaderComponent.html" data-type="entity-link" >HeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HealthRecordFormPage.html" data-type="entity-link" >HealthRecordFormPage</a>
                            </li>
                            <li class="link">
                                <a href="components/HealthRecordHeaderComponent.html" data-type="entity-link" >HealthRecordHeaderComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HealthRecordInformationSectionComponent.html" data-type="entity-link" >HealthRecordInformationSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/HealthRecordPage.html" data-type="entity-link" >HealthRecordPage</a>
                            </li>
                            <li class="link">
                                <a href="components/HealthRecordSectionComponent.html" data-type="entity-link" >HealthRecordSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/InformationItemComponent.html" data-type="entity-link" >InformationItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingCtaFooterComponent.html" data-type="entity-link" >LandingCtaFooterComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingFeaturesComponent.html" data-type="entity-link" >LandingFeaturesComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingHeroComponent.html" data-type="entity-link" >LandingHeroComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingHowItWorksComponent.html" data-type="entity-link" >LandingHowItWorksComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingNavbarComponent.html" data-type="entity-link" >LandingNavbarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LandingPageComponent.html" data-type="entity-link" >LandingPageComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginFormComponent.html" data-type="entity-link" >LoginFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/LoginPage.html" data-type="entity-link" >LoginPage</a>
                            </li>
                            <li class="link">
                                <a href="components/MainLayoutComponent.html" data-type="entity-link" >MainLayoutComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MeasureAddDialogComponent.html" data-type="entity-link" >MeasureAddDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MeasureBoardComponent.html" data-type="entity-link" >MeasureBoardComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MeasureChartComponent.html" data-type="entity-link" >MeasureChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MeasureDeleteDialogComponent.html" data-type="entity-link" >MeasureDeleteDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MeasureDetailsDialogComponent.html" data-type="entity-link" >MeasureDetailsDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MeasureModifyDialogComponent.html" data-type="entity-link" >MeasureModifyDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MeasureResumeComponent.html" data-type="entity-link" >MeasureResumeComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MeasureResumeItemComponent.html" data-type="entity-link" >MeasureResumeItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/MeasureSectionComponent.html" data-type="entity-link" >MeasureSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/NewsComponent.html" data-type="entity-link" >NewsComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PetFeedingComponent.html" data-type="entity-link" >PetFeedingComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterFormComponent.html" data-type="entity-link" >RegisterFormComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/RegisterPage.html" data-type="entity-link" >RegisterPage</a>
                            </li>
                            <li class="link">
                                <a href="components/ReminderPage.html" data-type="entity-link" >ReminderPage</a>
                            </li>
                            <li class="link">
                                <a href="components/ReminderSectionComponent.html" data-type="entity-link" >ReminderSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ResetPasswordComponent.html" data-type="entity-link" >ResetPasswordComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/ResetPasswordPage.html" data-type="entity-link" >ResetPasswordPage</a>
                            </li>
                            <li class="link">
                                <a href="components/SidebarComponent.html" data-type="entity-link" >SidebarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TabBarComponent.html" data-type="entity-link" >TabBarComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreatmentAddDialogComponent.html" data-type="entity-link" >TreatmentAddDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreatmentDeleteDialogComponent.html" data-type="entity-link" >TreatmentDeleteDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreatmentItemComponent.html" data-type="entity-link" >TreatmentItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreatmentModifyDialogComponent.html" data-type="entity-link" >TreatmentModifyDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/TreatmentSectionComponent.html" data-type="entity-link" >TreatmentSectionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UnderConstructionComponent.html" data-type="entity-link" >UnderConstructionComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UnderConstructionPage.html" data-type="entity-link" >UnderConstructionPage</a>
                            </li>
                            <li class="link">
                                <a href="components/VaccineAddDialogComponent.html" data-type="entity-link" >VaccineAddDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VaccineDeleteDialogComponent.html" data-type="entity-link" >VaccineDeleteDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VaccineItemComponent.html" data-type="entity-link" >VaccineItemComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VaccineModifyDialogComponent.html" data-type="entity-link" >VaccineModifyDialogComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/VaccinesSectionComponent.html" data-type="entity-link" >VaccinesSectionComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AppointmentPageBehavior.html" data-type="entity-link" >AppointmentPageBehavior</a>
                            </li>
                            <li class="link">
                                <a href="classes/AuthRules.html" data-type="entity-link" >AuthRules</a>
                            </li>
                            <li class="link">
                                <a href="classes/BpmServiceAction.html" data-type="entity-link" >BpmServiceAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/CalendarEventMapper.html" data-type="entity-link" >CalendarEventMapper</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChartManager.html" data-type="entity-link" >ChartManager</a>
                            </li>
                            <li class="link">
                                <a href="classes/DatePageBase.html" data-type="entity-link" >DatePageBase</a>
                            </li>
                            <li class="link">
                                <a href="classes/HealthRecordRules.html" data-type="entity-link" >HealthRecordRules</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeasureRules.html" data-type="entity-link" >MeasureRules</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeasureSectionBpm.html" data-type="entity-link" >MeasureSectionBpm</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeasureSectionRespiratoryFrequency.html" data-type="entity-link" >MeasureSectionRespiratoryFrequency</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeasureSectionTemperature.html" data-type="entity-link" >MeasureSectionTemperature</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeasureSectionWeight.html" data-type="entity-link" >MeasureSectionWeight</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeasureServiceActionBase.html" data-type="entity-link" >MeasureServiceActionBase</a>
                            </li>
                            <li class="link">
                                <a href="classes/MeasureServiceActionFactory.html" data-type="entity-link" >MeasureServiceActionFactory</a>
                            </li>
                            <li class="link">
                                <a href="classes/ReminderPageBehavior.html" data-type="entity-link" >ReminderPageBehavior</a>
                            </li>
                            <li class="link">
                                <a href="classes/RespiratoryRateServiceAction.html" data-type="entity-link" >RespiratoryRateServiceAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/TemperatureServiceAction.html" data-type="entity-link" >TemperatureServiceAction</a>
                            </li>
                            <li class="link">
                                <a href="classes/WeightServiceAction.html" data-type="entity-link" >WeightServiceAction</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AnimalFormFactory.html" data-type="entity-link" >AnimalFormFactory</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppointmentApi.html" data-type="entity-link" >AppointmentApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppointmentFacade.html" data-type="entity-link" >AppointmentFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppointmentPageStore.html" data-type="entity-link" >AppointmentPageStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthApi.html" data-type="entity-link" >AuthApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/BaseApi.html" data-type="entity-link" >BaseApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CalendarApi.html" data-type="entity-link" >CalendarApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CalendarFacade.html" data-type="entity-link" >CalendarFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CalendarStore.html" data-type="entity-link" >CalendarStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardFacade.html" data-type="entity-link" >DashboardFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DashboardStore.html" data-type="entity-link" >DashboardStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HealthRecordApi.html" data-type="entity-link" >HealthRecordApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HealthRecordExportApi.html" data-type="entity-link" >HealthRecordExportApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HealthRecordExportFormFactory.html" data-type="entity-link" >HealthRecordExportFormFactory</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HealthRecordFacade.html" data-type="entity-link" >HealthRecordFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HealthRecordFormBootstrapService.html" data-type="entity-link" >HealthRecordFormBootstrapService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HealthRecordMetadataApi.html" data-type="entity-link" >HealthRecordMetadataApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/HealthRecordStore.html" data-type="entity-link" >HealthRecordStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MeasuresApi.html" data-type="entity-link" >MeasuresApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MeasuresFacade.html" data-type="entity-link" >MeasuresFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MeasuresStore.html" data-type="entity-link" >MeasuresStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NewsApi.html" data-type="entity-link" >NewsApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NewsStore.html" data-type="entity-link" >NewsStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReminderApiService.html" data-type="entity-link" >ReminderApiService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ReminderPageStore.html" data-type="entity-link" >ReminderPageStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TreatmentApi.html" data-type="entity-link" >TreatmentApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TreatmentFacade.html" data-type="entity-link" >TreatmentFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TreatmentStore.html" data-type="entity-link" >TreatmentStore</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VaccinesApi.html" data-type="entity-link" >VaccinesApi</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VaccinesFacade.html" data-type="entity-link" >VaccinesFacade</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/VaccinesStore.html" data-type="entity-link" >VaccinesStore</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DatePageInterface.html" data-type="entity-link" >DatePageInterface</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Feature.html" data-type="entity-link" >Feature</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MeasureSectionBehavior.html" data-type="entity-link" >MeasureSectionBehavior</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MeasureServiceAction.html" data-type="entity-link" >MeasureServiceAction</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MenuItemModel.html" data-type="entity-link" >MenuItemModel</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#pipes-links"' :
                                'data-bs-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/DashboardNotificationPipe.html" data-type="entity-link" >DashboardNotificationPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/DateCounterPipe.html" data-type="entity-link" >DateCounterPipe</a>
                                </li>
                                <li class="link">
                                    <a href="pipes/MeasurePipe.html" data-type="entity-link" >MeasurePipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});