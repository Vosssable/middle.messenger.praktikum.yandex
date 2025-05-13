import router from './Router'
import Block from "./Block"


describe('Проверки блока Router', () => {
  const mockBlock = jest.fn() as unknown as typeof Block
  const testRouter = router

  testRouter.start()

  it('Проверка добавления маршрута', () => {
    testRouter.use('/settings', mockBlock)
    expect(testRouter['routes'].length).toBe(1)
  })

  it('Проверка получения маршрута', () => {
    testRouter.use('/test', mockBlock);
    const route = testRouter.getRoute('/test');
    expect(route).toBeDefined();
  })

  it('Проверка неправильного маршрута', () => {
    testRouter.use('/test', mockBlock);
    const route = testRouter.getRoute('/wrong');
    expect(route).toBeUndefined();
  })
})
