import {test} from '../../util/test';
import {
    queryRenderedFeatures,
    querySourceFeatures
} from '../../../src/source/query_features.js';
import SourceCache from '../../../src/source/source_cache.js';
import {create} from '../../../src/source/source.js';
import Transform from '../../../src/geo/transform.js';

test('QueryFeatures#rendered', (t) => {
    t.test('returns empty object if source returns no tiles', (t) => {
        const mockSourceCache = {tilesIn () { return []; }};
        const transform = new Transform();
        const result = queryRenderedFeatures(mockSourceCache, {}, undefined, {}, undefined, undefined, transform);
        t.deepEqual(result, []);
        t.end();
    });

    t.end();
});

test('QueryFeatures#source', (t) => {
    t.test('returns empty result when source has no features', (t) => {
        const source = create('test', {
            type: 'geojson',
            data: {type: 'FeatureCollection', features: []}
        }, {
            getActor() {
                return {
                    send(type, params, callback) { return callback(); }
                };
            }
        }, this);
        const sourceCache = new SourceCache('test', source);
        const result = querySourceFeatures(sourceCache, {});
        t.deepEqual(result, []);
        t.end();
    });

    t.end();
});
