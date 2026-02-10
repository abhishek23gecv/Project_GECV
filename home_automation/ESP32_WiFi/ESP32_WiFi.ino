/*************************************************************
  Blynk is a platform with iOS and Android apps to control
  ESP32, Arduino, Raspberry Pi and the likes over the Internet.
  You can easily build mobile and web interfaces for any
  projects by simply dragging and dropping widgets.

    Downloads, docs, tutorials: https://www.blynk.io
    Sketch generator:           https://examples.blynk.cc
    Blynk community:            https://community.blynk.cc
    Follow us:                  https://www.fb.com/blynkapp
                                https://twitter.com/blynk_app

  Blynk library is licensed under MIT license
  This example code is in public domain.

 *************************************************************
  This example runs directly on ESP32 chip.

  NOTE: This requires ESP32 support package:
    https://github.com/espressif/arduino-esp32

  Please be sure to select the right ESP32 module
  in the Tools -> Board menu!

  Change WiFi ssid, pass, and Blynk auth token to run :)
  Feel free to apply it to any other example. It's simple!
 *************************************************************/

/* Comment this out to disable prints and save space */
#define BLYNK_PRINT Serial

#define BLYNK_TEMPLATE_ID "TMPL34Mu7KEQX"
#define BLYNK_TEMPLATE_NAME "IoT LED"
#define BLYNK_DEVICE_NAME "IoT LED"     // Replace with your device name
#define BLYNK_AUTH_TOKEN "8Wc1LqveVE18L-CCECy9X5YfF5fawypW"


#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "GEC_Vaishali";
char pass[] = "12345679";

//Define Led Pin 
# define LED 2

void setup()
{
  // Debug console
  Serial.begin(115200);

  pinMode(LED,OUTPUT);

  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
}
// Virtual pin V0 in Blynk App controls the LED
BLYNK_WRITE(V0)
{
  int ledState = param.asInt();  // 0 or 1 from Button widget
  digitalWrite(LED, ledState);
}

void loop()
{
  Blynk.run();
}

