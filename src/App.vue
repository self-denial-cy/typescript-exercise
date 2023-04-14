<script lang="ts" setup>
import { fn, fn1 } from './main';

let name = 'this is string';
console.log(fn(name));

(async () => {
  await fn1();
})();
</script>
