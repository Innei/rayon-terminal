import { createStore } from 'solid-js/store'
class FeatureManager {
  private featureStore = createStore({
    searchBar: [false, {} as { a: string }] as const,
  })
  constructor() {}

  getFeature = (feature: keyof typeof this.featureStore[0]) => {
    return this.featureStore[0][feature]
  }

  isFeatureEnabled = (feature: keyof typeof this.featureStore[0]) => {
    return this.getFeature(feature)[0]
  }

  enableFeature = <
    T extends keyof typeof this.featureStore[0] = keyof typeof this.featureStore[0],
  >(
    feature: T,
    options?: typeof this.featureStore[0][T][1],
  ) => {
    const [state, setState] = this.featureStore
    // @ts-ignore
    setState(feature, ([_, _options]) => {
      // @ts-ignore
      return [true, { ..._options, ...options }]
    })
  }

  disableFeature = <
    T extends keyof typeof this.featureStore[0] = keyof typeof this.featureStore[0],
  >(
    feature: T,
  ) => {
    const [state, setState] = this.featureStore
    // @ts-ignore
    setState(feature, ([_, _options]) => {
      // @ts-ignore
      return [false, _options]
    })
  }

  toggleFeatureEnable = (feature: keyof typeof this.featureStore[0]) => {
    const isFeatureEnabled = this.isFeatureEnabled(feature)
    if (isFeatureEnabled) {
      this.disableFeature(feature)
    } else {
      this.enableFeature(feature)
    }
  }

  getAllFeatures() {
    return Object.keys(this.featureStore[0])
  }
}

export const featureManager = new FeatureManager()
