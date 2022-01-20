import { logger } from "@nrwl/devkit";
import {
  checkFilesExist,
  ensureNxProject,
  readJson,
  runNxCommandAsync,
  uniq,
} from "@nrwl/nx-plugin/testing";
describe("nx-neo e2e", () => {
  it("should create nx-neo", async () => {
    const plugin = uniq("nx-neo");
    ensureNxProject("@nx-neo/nx-neo", "dist/libs/nx-neo");
    await runNxCommandAsync(`generate @nx-neo/nx-neo:nx-neo ${plugin}`);

    const result = await runNxCommandAsync(`build ${plugin}`);
    expect(result.stdout).toContain("Executor ran");

    expect(true).toEqual(true);
  }, 65000);

  describe('--directory', () => {
    it('should create src in the specified directory', async () => {
      const plugin = uniq('nx-neo');
      ensureNxProject('@nx-neo/nx-neo', 'dist/libs/nx-neo');
      await runNxCommandAsync(
        `generate @nx-neo/nx-neo:nx-neo ${plugin} --directory subdir`
      );
      expect(() =>
        checkFilesExist(`libs/subdir/${plugin}/src/index.ts`)
      ).not.toThrow();
    }, 12000);
  });

  describe('--tags', () => {
    it('should add tags to the project', async () => {
      const plugin = uniq('nx-neo');
      ensureNxProject('@nx-neo/nx-neo', 'dist/libs/nx-neo');
      await runNxCommandAsync(
        `generate @nx-neo/nx-neo:nx-neo ${plugin} --tags e2etag,e2ePackage`
      );
      const project = readJson(`libs/${plugin}/project.json`);
      expect(project.tags).toEqual(['e2etag', 'e2ePackage']);
    }, 12000);
  });
});
