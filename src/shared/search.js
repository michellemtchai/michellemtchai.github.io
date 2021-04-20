import { encode } from 'html-entities';

export const searchResults = (props, term) => {
    let projects = props.projects[props.keyName].data;
    let data = [];
    if (term) {
        let terms = term.split(/\s+/g);
        let regex = new RegExp(`(${terms.join('|')})`, 'gi');
        let boldText = (text) =>
            encode(text).replace(regex, '<b>$1</b>');
        projects.forEach((project) => {
            let [match, relevance] = matchingTerm(
                props,
                project,
                terms,
                regex
            );
            if (match) {
                data.push({
                    ...project,
                    name: boldText(project.name),
                    summary: boldText(project.summary),
                    technologies: project.technologies.map(
                        (tech) => {
                            return {
                                ...tech,
                                name: boldText(tech.name),
                            };
                        }
                    ),
                    relevance: -relevance,
                });
            }
        });
    }
    return data;
};

const matchingTerm = (props, project, terms, regex) => {
    let nameMatch = matchRegex(project.name, regex);
    let summaryMatch = matchRegex(project.summary, regex);
    let tags = props.state.tags;
    let technologies = props.state.technologies;
    let tagMatch = searchListVal(project, 'tags', regex);
    let categoryMatch = searchListVal(
        project,
        'technologies',
        regex
    );
    return matchRelevance(
        terms,
        nameMatch,
        summaryMatch,
        tagMatch,
        categoryMatch
    );
};

const matchRegex = (value, regex) => {
    let match = value.match(regex);
    return match ? match : [];
};

const searchListVal = (project, keyName, regex) => {
    let matches = [];
    project[keyName].forEach((entry) => {
        let match = matchRegex(entry.name, regex);
        if (match.length > 0) {
            matches = [...matches, ...match];
        }
    });
    return matches;
};

const matchRelevance = (terms, ...matches) => {
    let mapping = {};
    let match = [].concat.apply([], matches);
    let containsAllTerms = false;
    if (match.length > 0) {
        match.forEach((entry) => {
            entry = entry.toLowerCase();
            if (!mapping[entry]) {
                mapping[entry] = 1;
            } else {
                mapping[entry]++;
            }
        });
        containsAllTerms =
            Object.keys(mapping).length === terms.length;
    }
    return [containsAllTerms, match.length];
};
