import { expect } from "chai";
import { ProgramsPlugin, WindowsProgramRepository, Program, FakeProgramRepository } from "./../../src/ts/search-plugins/programs-plugin";

function getTestPrograms(programNames: string[]) {
    return programNames.map((p): Program => {
        return <Program>{
            name: p,
            executionArgument: `C:\\Some\\Dummy\\FilePath\\${p}`
        };
    });
}

describe("ProgramsPlugin", (): void => {
    describe("getAllItems", (): void => {
        it("should return all programs", (): void => {
            let fakePrograms = getTestPrograms([
                "Git Bash",
                "Adobe Premiere Pro",
                "FL Studio (64-bit)",
                "Native Instruments Maschine 2",
                "Visual Studio Code"
            ]);

            let fakeProgramRepository = new FakeProgramRepository(fakePrograms);
            let programsPlugin = new ProgramsPlugin(fakeProgramRepository);

            let actual = programsPlugin.getAllItems();

            expect(actual.length).to.be.greaterThan(0);

            for (let fakeProgram of fakePrograms) {
                let filtered = actual.filter((a): boolean => {
                    return a.name === fakeProgram.name;
                });

                expect(filtered.length).to.eql(1);
                expect(filtered[0].name).to.equal(fakeProgram.name);
                expect(filtered[0].executionArgument).to.equal(fakeProgram.executionArgument);
                expect(filtered[0].tags.length).to.eql(0);
            }
        });
    });
});