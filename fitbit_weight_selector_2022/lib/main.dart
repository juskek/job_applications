import 'package:fitbit_weight_selector_2022/di_container/dependency_injection.dart';
import 'package:fitbit_weight_selector_2022/ui/home_page.dart';
import 'package:fitbit_weight_selector_2022/ui/home_page_view_model.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  configureDependencyInjection(Env.prod);
  runApp(MultiProvider(providers: [
    ChangeNotifierProvider(create: (context) => getIt<HomePageViewModel>()),
  ], child: const MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Fitbit Weight Selector Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}
