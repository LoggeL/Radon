declare module '@radon-types/command' {

    abstract class BaseCommand {
        public name: string;
        public description: string;
        public options: object;
        abstract run(options: object): Promise<unknown>;
    }
}