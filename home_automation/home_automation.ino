#define BLYNK_TEMPLATE_ID "TMPL3xDbuFMMR"
#define BLYNK_TEMPLATE_NAME "My Home"
#define BLYNK_AUTH_TOKEN "FIUpjyovJDIrbsWlSMRjdvfs_L3KAPlJ"

// Debug output
#define BLYNK_PRINT Serial

#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>

// WiFi Credentials
char ssid[] = "YOUR_WIFI_SSID";
char pass[] = "YOUR_WIFI_PASSWORD";

// Pin Definitions (ESP32 GPIOs)
#define FAN_PIN  5
#define ROOM_LIGHT_PIN 18
#define HALL_LIGHT_PIN 19
#define OUTDOOR_LIGHT_PIN 21
#define KITCHEN_LIGHT_PIN 22

// Reconnect check interval
unsigned long lastConnectionCheck = 0;
const unsigned long CONNECTION_CHECK_INTERVAL = 60000; // 60s

void setup() {
  Serial.begin(115200);
  Serial.println(F("HOME AUTOMATION v2.0 (ESP32)"));

  // Initialize pins
  pinMode(FAN_PIN, OUTPUT);
  pinMode(ROOM_LIGHT_PIN, OUTPUT);
  pinMode(HALL_LIGHT_PIN, OUTPUT);
  pinMode(OUTDOOR_LIGHT_PIN, OUTPUT);
  pinMode(KITCHEN_LIGHT_PIN, OUTPUT);

  // Initial states
  digitalWrite(FAN_PIN, LOW);
  digitalWrite(ROOM_LIGHT_PIN, LOW);
  digitalWrite(HALL_LIGHT_PIN, LOW);
  digitalWrite(OUTDOOR_LIGHT_PIN, LOW);
  digitalWrite(KITCHEN_LIGHT_PIN, LOW);

  Serial.println(F("Devices initialized"));

  // Connect to WiFi + Blynk
  connectToWiFi();
  connectToBlynk();

  Serial.println(F("System ready!"));
}

void loop() {
  Blynk.run();

  if (millis() - lastConnectionCheck > CONNECTION_CHECK_INTERVAL) {
    checkConnections();
    lastConnectionCheck = millis();
  }
  delay(10);
}

// Connect WiFi
void connectToWiFi() {
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);

  WiFi.begin(ssid, pass);
  int attempts = 0;
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(500);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi connected!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nWiFi connection failed");
  }
}

// Connect Blynk
void connectToBlynk() {
  Serial.println(F("Connecting to Blynk..."));
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
}

// Check WiFi + Blynk
void checkConnections() {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println(F("WiFi disconnected, reconnecting..."));
    connectToWiFi();
  }
  if (!Blynk.connected()) {
    Serial.println(F("Blynk disconnected, reconnecting..."));
    connectToBlynk();
  }
}

// Device Control Functions
BLYNK_WRITE(V2) {
  int state = param.asInt();
  digitalWrite(FAN_PIN, state);
  Serial.print(F("Fan: "));
  Serial.println(state ? F("ON") : F("OFF"));
  Blynk.virtualWrite(V2, state);
}

BLYNK_WRITE(V0) {
  int state = param.asInt();
  digitalWrite(ROOM_LIGHT_PIN, state);
  Serial.print(F("Room: "));
  Serial.println(state ? F("ON") : F("OFF"));
  Blynk.virtualWrite(V0, state);
}

BLYNK_WRITE(V1) {
  int state = param.asInt();
  digitalWrite(HALL_LIGHT_PIN, state);
  Serial.print(F("Hall: "));
  Serial.println(state ? F("ON") : F("OFF"));
  Blynk.virtualWrite(V1, state);
}

BLYNK_WRITE(V3) {
  int state = param.asInt();
  digitalWrite(OUTDOOR_LIGHT_PIN, state);
  Serial.print(F("Outdoor: "));
  Serial.println(state ? F("ON") : F("OFF"));
  Blynk.virtualWrite(V3, state);
}

BLYNK_WRITE(V4) {
  int state = param.asInt();
  digitalWrite(KITCHEN_LIGHT_PIN, state);
  Serial.print(F("Kitchen: "));
  Serial.println(state ? F("ON") : F("OFF"));
  Blynk.virtualWrite(V4, state);
}

BLYNK_CONNECTED() {
  Serial.println(F("Blynk connected!"));

  // Sync states
  Blynk.virtualWrite(V2, digitalRead(FAN_PIN));
  Blynk.virtualWrite(V0, digitalRead(ROOM_LIGHT_PIN));
  Blynk.virtualWrite(V1, digitalRead(HALL_LIGHT_PIN));
  Blynk.virtualWrite(V3, digitalRead(OUTDOOR_LIGHT_PIN));
  Blynk.virtualWrite(V4, digitalRead(KITCHEN_LIGHT_PIN));

  Serial.println(F("States synced"));
}

BLYNK_DISCONNECTED() {
  Serial.println(F("Blynk disconnected"));
}
