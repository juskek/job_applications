# fitbit_weight_selector_2022

This repository holds example code an improved weight selector for Fitbit's iOS app (version 3.68).

## Overview

The gif below shows the old weight selector in fitbit and an improved version allowing the user to input their weight in stones and pounds or kilograms.

![Demo](https://github.com/juskek/job_applications/blob/main/fitbit_weight_selector_2022/demo.gif)

## UI Highlights

* Input weight in imperial (st/lbs) or SI units (kg)
* Automatic conversion between imperial and SI units
* Save button to update data source.
 
## Codebase Highlights

* Software architecture based on [Android best practices](https://developer.android.com/topic/architecture)
* State Management with Provider package
* Service Locator with getIt
* Dependency Injection with injectable
* [Unit Testing of converter](https://github.com/juskek/job_applications/blob/main/fitbit_weight_selector_2022/test/unit/utils/test_imperial_si_units_converter.dart): `flutter test test/unit/unit_test.dart`
* [Widget Testing to check components are rendering correctly](https://github.com/juskek/job_applications/blob/main/fitbit_weight_selector_2022/test/widget/test_demo_page.dart): `flutter test test/widget/widget_test.dart`
* [Integration Testing to check basic functionality is working](https://github.com/juskek/job_applications/blob/main/fitbit_weight_selector_2022/integration_test/app_test.dart): `flutter test integration_test`

