import { Model, model } from 'active-record-js';


@model
class Certification extends Model
{
    public static table = 'certifications';
}

export default Certification;
