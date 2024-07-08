const { Lazy, MemoLazy } = require("../out/main")

const tests = []
const it = (message, test) => tests.push({ message, test })
const assert = (condition) => {
  if (!condition) throw new Error()
}

it("[Lazy] reuses the created value even if the selected value has changed", () => {
  let selectedValue = 0
  const lazy = new Lazy(() => {
    return selectedValue * 10
  })

  selectedValue++
  assert(lazy.value === 10)

  selectedValue++
  assert(lazy.value === 10)
})

it("[MemoLazy] recomputes the created value if the selected value has changed", () => {
  let selectedValue = 0
  const lazy = new MemoLazy(
    () => selectedValue,
    (selectedValue) => {
      return selectedValue * 10
    }
  )

  selectedValue++
  assert(lazy.value === 10)

  selectedValue++
  assert(lazy.value === 20)
})

tests.forEach((test) => {
  try {
    test.test()
    console.log(`✅ ${test.message}`)
  } catch (error) {
    console.error(`❌ ${test.message}`)
  }
})
