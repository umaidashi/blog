export class DIContainer<DependencyTypes> {
  private registry = new Map<keyof DependencyTypes, DependencyTypes[keyof DependencyTypes]>()

  register<Key extends keyof DependencyTypes, Args extends unknown[]>(
    key: Key,
    Constructor: new (...args: Args) => DependencyTypes[Key],
    ...args: Args
  ): void {
    const instance = new Constructor(...args)
    this.registry.set(key, instance)
  }

  get<Key extends keyof DependencyTypes>(key: Key): DependencyTypes[Key] {
    const instance = this.registry.get(key)
    if (!instance) {
      throw new Error(`DIContainer: ${String(key)} is not registered.`)
    }
    return instance as DependencyTypes[Key]
  }
}
