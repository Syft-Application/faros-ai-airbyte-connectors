import {
  AirbyteLogger,
  AirbyteStreamBase,
  StreamKey,
  SyncMode,
} from 'faros-airbyte-cdk';
import {Dictionary} from 'ts-essentials';

import {Buildkite, BuildkiteConfig, Organization} from '../buildkite';

export class Organizations extends AirbyteStreamBase {
  constructor(
    private readonly config: BuildkiteConfig,
    protected readonly logger: AirbyteLogger
  ) {
    super(logger);
  }

  getJsonSchema(): Dictionary<any, string> {
    return require('../../resources/schemas/organizations.json');
  }
  get primaryKey(): StreamKey {
    return 'id';
  }

  async *readRecords(
    syncMode: SyncMode,
    cursorField?: string[],
    streamSlice?: Dictionary<any>,
    streamState?: Dictionary<any>
  ): AsyncGenerator<Organization> {
    const buildkite = Buildkite.instance(this.config, this.logger);

    yield* buildkite.getOrganizations();
  }
}
