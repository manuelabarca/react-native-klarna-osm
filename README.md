# react-native-klarna-osm

`react-native-klarna-osm` is a React Native library that simplifies the integration of Klarna's On-Site Messaging (OSM) into your mobile application.

## Features

- Display Klarna's On-Site Messaging (OSM) effortlessly in React Native.
- Configurable styles for seamless design integration.
- Debug mode for enhanced development experience.
- Includes a modal WebView for "Learn More" links.

## Installation

1. Add the library to your project:

```bash
npm install react-native-klarna-osm
# or
yarn add react-native-klarna-osm
# or
pnpm add react-native-klarna-osm
```

2. Install the required dependencies:

```bash
npm install react-native-svg
# or
yarn add react-native-svg
# or
pnpm add react-native-svg
```

3. Link native dependencies if not using autolinking:

```bash
npx react-native link react-native-svg
```

## Usage

```tsx
import React from 'react';
import { View } from 'react-native';
import KlarnaOSM from 'react-native-klarna-osm';

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <KlarnaOSM
        clientId="your-client-id"
        placementKey="your-placement-key"
        locale="es-ES"
        purchaseAmount={10000} // Amount in minor units (e.g., 100.00 USD -> 10000)
        version="v3"
        region="EU"
        environment="playground" // or 'production'
        debug={true}
        style={{
          container: { margin: 10 },
          badge: { marginBottom: 10 },
          message: { fontSize: 14, color: '#000' },
          learnMore: { color: '#007aff', textDecorationLine: 'underline' },
        }}
      />
    </View>
  );
};

export default App;
```

## Props

| Prop Name        | Type    | Required | Description                                                                 |
| ---------------- | ------- | -------- | --------------------------------------------------------------------------- |
| `clientId`       | string  | Yes      | Your Klarna Client ID.                                                      |
| `placementKey`   | string  | Yes      | Klarna placement key for the OSM.                                           |
| `locale`         | string  | Yes      | Locale for the OSM content (e.g., `en-US`, `sv-SE`).                        |
| `purchaseAmount` | number  | Yes      | Purchase amount in minor units (e.g., 10000 for $100.00).                   |
| `version`        | string  | Yes      | API version to use (e.g., `v3`).                                            |
| `region`         | string  | Yes      | Klarna region (`US`, `EU`, etc.).                                           |
| `environment`    | string  | Yes      | Environment to use (`playground` or `production`).                          |
| `style`          | object  | No       | Custom styles for various elements (container, badge, message, learn more). |
| `debug`          | boolean | No       | Enables debug mode for detailed logging.                                    |

## Contributing

Contributions are welcome! Please submit a pull request or create an issue to report a bug or suggest a feature.

## License

MIT

## Notes

- Ensure you have valid Klarna credentials to use the service.
- Test your integration in the `playground` environment before switching to `production`.

---

Happy coding with `react-native-klarna-osm`! 🎉
