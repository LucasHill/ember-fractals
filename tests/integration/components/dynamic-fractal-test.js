import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | dynamic fractal', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{dynamic-fractal}}`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      {{#dynamic-fractal}}
        template block text
      {{/dynamic-fractal}}
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
